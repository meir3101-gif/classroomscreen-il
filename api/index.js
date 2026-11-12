'use strict';

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

/* =========================================================================
 * Configuration (all from environment variables – nothing is editable from
 * the browser any more).
 *
 *   GOOGLE_CLIENT_ID   – OAuth 2.0 Web Client ID from Google Cloud Console
 *   SESSION_SECRET     – long random string used to sign login sessions
 *   KV_REST_API_URL / KV_REST_API_TOKEN            (Upstash via Vercel)
 *   or UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN
 * ========================================================================= */

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const GOOGLE_CLIENT_ID = (process.env.GOOGLE_CLIENT_ID || '952919285347-7g5ng6t4ogaksbbuaqt5jiad0uvma0a0.apps.googleusercontent.com').trim();
const REDIS_URL = (process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '').replace(/\/+$/, '');
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

const SESSION_COOKIE = 'cs_session';
const SESSION_MAX_AGE_SEC = 30 * 24 * 3600;
const POLL_TTL_SEC = 7 * 24 * 3600;
const MAX_BODY_BYTES = 4 * 1024 * 1024;

let SESSION_SECRET = process.env.SESSION_SECRET || '';
if (!SESSION_SECRET && !IS_SERVERLESS) {
  // Local development only: random secret per process (sessions reset on restart).
  SESSION_SECRET = crypto.randomBytes(32).toString('hex');
  console.warn('[classroomscreen] SESSION_SECRET not set – using a temporary development secret.');
}

/* =========================================================================
 * Storage: Upstash Redis (REST) in production, JSON file for local dev.
 * ========================================================================= */

function createRedisStore() {
  async function command(args) {
    const res = await fetch(REDIS_URL, {
      method: 'POST',
      headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(args)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || data.error) {
      throw new Error(`Redis error: ${data.error || res.status}`);
    }
    return data.result;
  }
  return {
    kind: 'redis',
    async getJSON(key) {
      const raw = await command(['GET', key]);
      return raw ? JSON.parse(raw) : null;
    },
    async setJSON(key, value, ttlSec) {
      const args = ['SET', key, JSON.stringify(value)];
      if (ttlSec) args.push('EX', String(ttlSec));
      await command(args);
    },
    async getCounters(key) {
      const flat = (await command(['HGETALL', key])) || [];
      const out = {};
      for (let i = 0; i < flat.length; i += 2) out[flat[i]] = Number(flat[i + 1]) || 0;
      return out;
    },
    async setCounters(key, counters, ttlSec) {
      await command(['DEL', key]);
      const fields = Object.entries(counters).flat().map(String);
      if (fields.length) await command(['HSET', key, ...fields]);
      if (ttlSec) await command(['EXPIRE', key, String(ttlSec)]);
    },
    async incrCounter(key, field, ttlSec) {
      const value = await command(['HINCRBY', key, String(field), '1']);
      if (ttlSec) await command(['EXPIRE', key, String(ttlSec)]);
      return Number(value);
    }
  };
}

function createFileStore() {
  const dataDir = process.env.CLASSROOMSCREEN_DATA_DIR
    || (IS_SERVERLESS ? path.join('/tmp', 'classroomscreen-data') : path.join(__dirname, '..', 'data'));
  const file = path.join(dataDir, 'db.json');
  let cache = null;
  function load() {
    if (cache) return cache;
    try {
      cache = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    } catch (err) {
      console.error('Error reading db.json:', err);
      cache = {};
    }
    return cache;
  }
  function persist() {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
      fs.writeFileSync(file, JSON.stringify(cache, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving db.json:', err);
    }
  }
  return {
    kind: 'file',
    async getJSON(key) {
      const v = load()[key];
      return v === undefined ? null : JSON.parse(JSON.stringify(v));
    },
    async setJSON(key, value) {
      load()[key] = value;
      persist();
    },
    async getCounters(key) {
      return { ...(load()[key] || {}) };
    },
    async setCounters(key, counters) {
      load()[key] = { ...counters };
      persist();
    },
    async incrCounter(key, field) {
      const db = load();
      db[key] = db[key] || {};
      db[key][field] = (Number(db[key][field]) || 0) + 1;
      persist();
      return db[key][field];
    }
  };
}

const store = REDIS_URL && REDIS_TOKEN ? createRedisStore() : createFileStore();
if (store.kind === 'file' && IS_SERVERLESS) {
  console.warn('[classroomscreen] No Redis configured – data is stored in /tmp and WILL be lost. Connect Upstash Redis.');
}

const keys = {
  user: (id) => `user:${id}`,
  workspace: (id) => `ws:${id}`,
  poll: (id) => `poll:${id}`,
  pollVotes: (id) => `poll:${id}:votes`
};

/* =========================================================================
 * Helpers
 * ========================================================================= */

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

function safeEqual(a, b) {
  const ba = Buffer.from(String(a));
  const bb = Buffer.from(String(b));
  return ba.length === bb.length && crypto.timingSafeEqual(ba, bb);
}

function parseCookies(req) {
  const list = {};
  const header = req.headers.cookie;
  if (!header) return list;
  header.split(';').forEach((cookie) => {
    const [rawName, ...rest] = cookie.split('=');
    const name = rawName?.trim();
    if (!name) return;
    const value = rest.join('=').trim();
    try {
      list[name] = decodeURIComponent(value);
    } catch (_) {
      list[name] = value;
    }
  });
  return list;
}

function cookieAttrs(req) {
  const proto = req.headers['x-forwarded-proto'] || (IS_SERVERLESS ? 'https' : 'http');
  return `HttpOnly; Path=/; SameSite=Lax${proto === 'https' ? '; Secure' : ''}`;
}

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string' || Buffer.isBuffer(req.body)) {
    try {
      const text = req.body.toString('utf8');
      return Promise.resolve(text ? JSON.parse(text) : {});
    } catch (e) {
      return Promise.reject(httpError(400, 'Invalid JSON'));
    }
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString('utf8');
      if (body.length > MAX_BODY_BYTES) {
        reject(httpError(413, 'הנתונים גדולים מדי'));
        req.destroy();
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(httpError(400, 'Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function sendJson(res, statusCode, data, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    ...extraHeaders
  });
  res.end(JSON.stringify(data));
}

/* =========================================================================
 * Sessions – stateless, HMAC-signed tokens (survive serverless cold starts
 * and cannot be forged without SESSION_SECRET).
 * ========================================================================= */

function signSession(userId) {
  const payload = Buffer.from(JSON.stringify({
    uid: userId,
    exp: Date.now() + SESSION_MAX_AGE_SEC * 1000
  })).toString('base64url');
  const sig = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  return `${payload}.${sig}`;
}

function verifySession(token) {
  if (!token || !SESSION_SECRET || typeof token !== 'string') return null;
  const [payload, sig] = token.split('.');
  if (!payload || !sig) return null;
  const expected = crypto.createHmac('sha256', SESSION_SECRET).update(payload).digest('base64url');
  if (!safeEqual(sig, expected)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    if (!data.uid || !data.exp || data.exp < Date.now()) return null;
    return data;
  } catch (_) {
    return null;
  }
}

async function getAuthUser(req) {
  const cookies = parseCookies(req);
  const session = verifySession(cookies[SESSION_COOKIE]);
  if (!session) return null;
  return store.getJSON(keys.user(session.uid));
}

/* =========================================================================
 * Google ID token verification (official tokeninfo endpoint).
 * ========================================================================= */

async function verifyGoogleIdToken(idToken) {
  if (!GOOGLE_CLIENT_ID) throw httpError(503, 'התחברות Google לא הוגדרה בשרת');
  if (typeof idToken !== 'string' || idToken.length > 4096) throw httpError(400, 'טוקן לא תקין');

  const res = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`);
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || payload.error) {
    throw httpError(401, 'אימות Google נכשל');
  }
  const validIssuer = payload.iss === 'accounts.google.com' || payload.iss === 'https://accounts.google.com';
  const emailVerified = payload.email_verified === true || payload.email_verified === 'true';
  if (payload.aud !== GOOGLE_CLIENT_ID || !validIssuer || !emailVerified || !payload.sub) {
    throw httpError(401, 'אימות Google נכשל');
  }
  if (Number(payload.exp) * 1000 < Date.now()) {
    throw httpError(401, 'פג תוקף ההתחברות, נסה שוב');
  }
  return {
    sub: payload.sub,
    email: payload.email,
    name: payload.name || payload.email.split('@')[0],
    picture: payload.picture || ''
  };
}

/* =========================================================================
 * Validation
 * ========================================================================= */

function sanitizeWorkspace(body) {
  if (!body || typeof body !== 'object' || !Array.isArray(body.screens)) return null;
  return {
    activeScreenId: body.activeScreenId ?? null,
    selectedClassId: body.selectedClassId ?? null,
    classLists: Array.isArray(body.classLists) ? body.classLists : [],
    screens: body.screens,
    weeklySchedule: (body.weeklySchedule && typeof body.weeklySchedule === 'object') ? body.weeklySchedule : undefined,
    studentScores: (body.studentScores && typeof body.studentScores === 'object') ? body.studentScores : undefined,
    studentIcons: (body.studentIcons && typeof body.studentIcons === 'object') ? body.studentIcons : undefined,
    studentPhotos: (body.studentPhotos && typeof body.studentPhotos === 'object') ? body.studentPhotos : undefined,
    classGoals: (body.classGoals && typeof body.classGoals === 'object') ? body.classGoals : undefined,
    lastDailyResetDate: typeof body.lastDailyResetDate === 'string' ? body.lastDailyResetDate : undefined
  };
}

const POLL_ID_RE = /^[a-zA-Z0-9_-]{3,40}$/;

function sanitizePollInput(body) {
  const question = String(body.question ?? 'סקר כיתתי').slice(0, 300);
  const rawOptions = Array.isArray(body.options) ? body.options.slice(0, 12) : [];
  const options = rawOptions.map((o) => ({
    label: String(o?.label ?? '').slice(0, 120),
    votes: Math.max(0, Math.min(100000, Math.floor(Number(o?.votes) || 0)))
  }));
  return { question, options };
}

async function loadPoll(pollId) {
  const meta = await store.getJSON(keys.poll(pollId));
  if (!meta) return null;
  const counters = await store.getCounters(keys.pollVotes(pollId));
  return {
    id: pollId,
    question: meta.question,
    options: meta.labels.map((label, i) => ({ label, votes: counters[i] || 0 })),
    updatedAt: meta.updatedAt
  };
}

/* =========================================================================
 * Student vote page (all user content is HTML-escaped).
 * ========================================================================= */

function renderStudentVotePage(poll) {
  if (!poll) {
    return `<!DOCTYPE html><html lang="he" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>סקר כיתתי</title>
    <style>body{font-family:sans-serif;background:#0f172a;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;text-align:center;padding:20px;}</style></head>
    <body><div><h2>הסקר אינו פעיל כרגע</h2><p>בקשו מהמורה לפתוח את הסקר על מסך הכיתה.</p></div></body></html>`;
  }
  return `<!DOCTYPE html>
<html lang="he" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>הצבעה בסקר כיתתי</title>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@400;700;900&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; font-family: 'Heebo', sans-serif; }
    body { margin: 0; min-height: 100vh; background: linear-gradient(135deg, #1e1b4b, #4338ca); color: #fff; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .card { background: #fff; color: #0f172a; width: min(440px, 100%); border-radius: 24px; padding: 28px 22px; box-shadow: 0 20px 50px rgba(0,0,0,0.35); text-align: center; }
    h1 { font-size: 1.35rem; margin: 0 0 18px; color: #1e1b4b; }
    .options { display: flex; flex-direction: column; gap: 12px; }
    .opt-btn { padding: 16px; border-radius: 14px; border: 2px solid #e2e8f0; background: #f8fafc; font-size: 1.1rem; font-weight: 700; cursor: pointer; transition: all 0.15s; color: #0f172a; }
    .opt-btn:hover, .opt-btn:active { background: #4f46e5; color: #fff; border-color: #4f46e5; transform: scale(1.02); }
    .done-msg { display: none; font-size: 1.25rem; font-weight: 800; color: #10b981; padding: 20px 0; }
  </style>
</head>
<body>
  <div class="card">
    <div style="font-size:2.4rem;margin-bottom:8px;">📊</div>
    <h1 id="q-title">${escapeHtml(poll.question)}</h1>
    <div class="options" id="opts">
      ${poll.options.map((o, idx) => `<button class="opt-btn" data-idx="${idx}">${escapeHtml(o.label)}</button>`).join('')}
    </div>
    <div class="done-msg" id="done">✅ תודה! ההצבעה שלך נקלטה במסך הכיתה.</div>
  </div>
  <script>
    (function () {
      var pollId = ${JSON.stringify(poll.id).replace(/</g, '\\u003c')};
      document.querySelectorAll('.opt-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          document.getElementById('opts').style.display = 'none';
          document.getElementById('done').style.display = 'block';
          fetch('/api/polls/' + encodeURIComponent(pollId) + '/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ optionIndex: Number(btn.dataset.idx) })
          });
        });
      });
    })();
  </script>
</body>
</html>`;
}

/* =========================================================================
 * Router
 * ========================================================================= */

async function route(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // ---- Public config (read-only) ----
  if (pathname === '/api/config' && method === 'GET') {
    return sendJson(res, 200, {
      googleClientId: GOOGLE_CLIENT_ID,
      cloudStorage: store.kind === 'redis'
    });
  }

  // ---- Auth ----
  if (pathname === '/api/auth/me' && method === 'GET') {
    const user = await getAuthUser(req);
    if (!user) return sendJson(res, 200, { authenticated: false, user: null });
    return sendJson(res, 200, {
      authenticated: true,
      user,
      workspace: await store.getJSON(keys.workspace(user.id))
    });
  }

  if (pathname === '/api/auth/google' && method === 'POST') {
    if (!SESSION_SECRET) throw httpError(503, 'השרת לא הוגדר (SESSION_SECRET חסר)');
    const body = await readJsonBody(req);
    if (!body.credential) throw httpError(400, 'חסרים פרטי התחברות מגוגל');

    const profile = await verifyGoogleIdToken(body.credential);
    const userId = `g_${profile.sub}`;
    const now = new Date().toISOString();
    const existing = (await store.getJSON(keys.user(userId))) || {};
    const user = {
      id: userId,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      createdAt: existing.createdAt || now,
      lastLoginAt: now
    };
    await store.setJSON(keys.user(userId), user);

    let workspace = await store.getJSON(keys.workspace(userId));
    const initial = sanitizeWorkspace(body.initialWorkspace);
    if (!workspace && initial) {
      workspace = { ...initial, updatedAt: now };
      await store.setJSON(keys.workspace(userId), workspace);
    }

    return sendJson(res, 200, { ok: true, user, workspace }, {
      'Set-Cookie': `${SESSION_COOKIE}=${signSession(userId)}; ${cookieAttrs(req)}; Max-Age=${SESSION_MAX_AGE_SEC}`
    });
  }

  if (pathname === '/api/auth/logout' && method === 'POST') {
    return sendJson(res, 200, { ok: true }, {
      'Set-Cookie': [
        `${SESSION_COOKIE}=; ${cookieAttrs(req)}; Max-Age=0`,
        // Clear the legacy, insecure cookie from older versions.
        `cs_user=; ${cookieAttrs(req)}; Max-Age=0`
      ]
    });
  }

  // ---- Workspace (requires login) ----
  if (pathname === '/api/workspace' && (method === 'GET' || method === 'PUT')) {
    const user = await getAuthUser(req);
    if (!user) throw httpError(401, 'לא מחובר');
    if (method === 'GET') {
      return sendJson(res, 200, { workspace: await store.getJSON(keys.workspace(user.id)) });
    }
    const workspace = sanitizeWorkspace(await readJsonBody(req));
    if (!workspace) throw httpError(400, 'נתוני מסך לא תקינים');
    workspace.updatedAt = new Date().toISOString();
    await store.setJSON(keys.workspace(user.id), workspace);
    return sendJson(res, 200, { ok: true, updatedAt: workspace.updatedAt });
  }

  // ---- Polls ----
  const pollMatch = pathname.match(/^\/api\/polls\/([^/]+)(\/vote)?$/);
  if (pollMatch) {
    const pollId = pollMatch[1];
    const isVote = Boolean(pollMatch[2]);
    if (!POLL_ID_RE.test(pollId)) throw httpError(400, 'מזהה סקר לא תקין');

    if (isVote && method === 'POST') {
      const meta = await store.getJSON(keys.poll(pollId));
      if (!meta) throw httpError(404, 'Poll not found');
      const body = await readJsonBody(req);
      const idx = Number(body.optionIndex);
      if (Number.isInteger(idx) && idx >= 0 && idx < meta.labels.length) {
        await store.incrCounter(keys.pollVotes(pollId), idx, POLL_TTL_SEC);
      }
      return sendJson(res, 200, { ok: true });
    }

    if (!isVote && method === 'GET') {
      const poll = await loadPoll(pollId);
      if (!poll) throw httpError(404, 'Poll not found');
      return sendJson(res, 200, { poll });
    }

    if (!isVote && method === 'POST') {
      const body = await readJsonBody(req);
      const ownerKey = typeof body.ownerKey === 'string' ? body.ownerKey : '';
      if (ownerKey.length < 16 || ownerKey.length > 128) throw httpError(400, 'חסר מפתח סקר');

      const existing = await store.getJSON(keys.poll(pollId));
      const ownerHash = crypto.createHash('sha256').update(ownerKey).digest('hex');
      if (existing && !safeEqual(existing.ownerHash, ownerHash)) {
        throw httpError(403, 'אין הרשאה לערוך סקר זה');
      }
      const { question, options } = sanitizePollInput(body);
      const meta = {
        ownerHash,
        question,
        labels: options.map((o) => o.label),
        updatedAt: Date.now()
      };
      await store.setJSON(keys.poll(pollId), meta, POLL_TTL_SEC);
      await store.setCounters(
        keys.pollVotes(pollId),
        Object.fromEntries(options.map((o, i) => [i, o.votes])),
        POLL_TTL_SEC
      );
      return sendJson(res, 200, { ok: true, poll: await loadPoll(pollId) });
    }
  }

  // ---- Student vote page ----
  if (pathname.startsWith('/vote/')) {
    const pollId = pathname.split('/')[2] || '';
    const poll = POLL_ID_RE.test(pollId) ? await loadPoll(pollId) : null;
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff'
    });
    return res.end(renderStudentVotePage(poll));
  }

  throw httpError(404, 'Not found');
}

module.exports = async function apiHandler(req, res) {
  try {
    await route(req, res);
  } catch (err) {
    const status = err.status || 500;
    if (status >= 500) console.error('[classroomscreen]', err);
    if (!res.headersSent) {
      sendJson(res, status, { error: status >= 500 && !err.status ? 'שגיאת שרת' : err.message });
    }
  }
};
