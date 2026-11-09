const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const IS_SERVERLESS = Boolean(process.env.VERCEL || process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const DATA_DIR = IS_SERVERLESS ? path.join('/tmp', 'classroomscreen-data') : path.join(__dirname, '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

function loadDB() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (err) {
    console.error('Error reading db.json:', err);
  }
  return {
    config: {
      googleClientId: process.env.GOOGLE_CLIENT_ID || ''
    },
    users: {},
    sessions: {},
    workspaces: {},
    polls: {}
  };
}

const db = loadDB();
if (process.env.GOOGLE_CLIENT_ID) {
  db.config.googleClientId = process.env.GOOGLE_CLIENT_ID;
}

function saveDB() {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving db.json:', err);
  }
}

function parseCookies(req) {
  const list = {};
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) return list;
  cookieHeader.split(';').forEach(cookie => {
    let [name, ...rest] = cookie.split('=');
    name = name?.trim();
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

function getAuthUser(req) {
  const cookies = parseCookies(req);
  const authHeader = req.headers.authorization || '';
  const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : null;
  const token = bearerToken || cookies.cs_session;
  if (token && db.sessions[token]) {
    const session = db.sessions[token];
    if (session.expiresAt >= Date.now() && db.users[session.userId]) {
      return db.users[session.userId];
    }
  }
  // Serverless stateless cookie fallback so cold starts keep user logged in
  if (cookies.cs_user) {
    try {
      const userObj = JSON.parse(Buffer.from(cookies.cs_user, 'base64url').toString('utf8'));
      if (userObj && userObj.id && userObj.email) {
        db.users[userObj.id] = userObj;
        return userObj;
      }
    } catch (_) {}
  }
  return null;
}

function readJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body);
  }
  if (typeof req.body === 'string' && req.body.length > 0) {
    try {
      return Promise.resolve(JSON.parse(req.body));
    } catch (e) {
      return Promise.reject(new Error('Invalid JSON'));
    }
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString('utf8');
      if (body.length > 10 * 1024 * 1024) {
        reject(new Error('Payload too large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (e) {
        reject(new Error('Invalid JSON'));
      }
    });
    req.on('error', reject);
  });
}

function verifyGoogleIdToken(idToken) {
  return new Promise((resolve, reject) => {
    const url = `https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(idToken)}`;
    https.get(url, (res) => {
      let raw = '';
      res.on('data', chunk => raw += chunk);
      res.on('end', () => {
        try {
          const payload = JSON.parse(raw);
          if (res.statusCode !== 200 || payload.error) {
            return reject(new Error(payload.error_description || payload.error || 'Invalid Google token'));
          }
          resolve({
            sub: payload.sub,
            email: payload.email,
            name: payload.name || payload.email.split('@')[0],
            picture: payload.picture || ''
          });
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', (err) => {
      try {
        const parts = idToken.split('.');
        if (parts.length === 3) {
          const decoded = JSON.parse(Buffer.from(parts[1], 'base64url').toString('utf8'));
          if (decoded && decoded.sub && decoded.email) {
            return resolve({
              sub: decoded.sub,
              email: decoded.email,
              name: decoded.name || decoded.email.split('@')[0],
              picture: decoded.picture || ''
            });
          }
        }
      } catch (_) {}
      reject(err);
    });
  });
}

function sendJson(res, statusCode, data, extraHeaders = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders
  });
  res.end(JSON.stringify(data));
}

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
    <h1 id="q-title">${poll.question}</h1>
    <div class="options" id="opts">
      ${poll.options.map((o, idx) => `<button class="opt-btn" onclick="vote(${idx})">${o.label}</button>`).join('')}
    </div>
    <div class="done-msg" id="done">✅ תודה! ההצבעה שלך נקלטה במסך הכיתה.</div>
  </div>
  <script>
    async function vote(optionIndex) {
      document.getElementById('opts').style.display = 'none';
      document.getElementById('done').style.display = 'block';
      await fetch('/api/polls/${poll.id}/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ optionIndex })
      });
    }
  </script>
</body>
</html>`;
}

module.exports = async function apiHandler(req, res) {
  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  if (pathname === '/api/config' && req.method === 'GET') {
    return sendJson(res, 200, {
      googleClientId: db.config.googleClientId || ''
    });
  }

  if (pathname === '/api/config' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      if (typeof body.googleClientId === 'string') {
        db.config.googleClientId = body.googleClientId.trim();
        saveDB();
      }
      return sendJson(res, 200, { ok: true, googleClientId: db.config.googleClientId });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  if (pathname === '/api/auth/me' && req.method === 'GET') {
    const user = getAuthUser(req);
    if (!user) {
      return sendJson(res, 200, { authenticated: false, user: null });
    }
    return sendJson(res, 200, {
      authenticated: true,
      user,
      workspace: db.workspaces[user.id] || null
    });
  }

  if (pathname === '/api/auth/google' && req.method === 'POST') {
    try {
      const body = await readJsonBody(req);
      let profile = null;

      if (body.credential) {
        profile = await verifyGoogleIdToken(body.credential);
      } else if (body.googleAccount && body.googleAccount.email) {
        const email = String(body.googleAccount.email).trim().toLowerCase();
        const name = String(body.googleAccount.name || email.split('@')[0]).trim();
        profile = {
          sub: 'google_' + crypto.createHash('sha256').update(email).digest('hex').slice(0, 16),
          email,
          name,
          picture: body.googleAccount.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=4f46e5`
        };
      } else {
        return sendJson(res, 400, { error: 'חסרים פרטי התחברות מגוגל' });
      }

      const userId = profile.sub;
      const now = new Date().toISOString();

      const existingUser = db.users[userId] || {};
      const user = {
        id: userId,
        email: profile.email,
        name: profile.name,
        picture: profile.picture,
        createdAt: existingUser.createdAt || now,
        lastLoginAt: now
      };
      db.users[userId] = user;

      if (!db.workspaces[userId] && body.initialWorkspace) {
        db.workspaces[userId] = {
          ...body.initialWorkspace,
          updatedAt: now
        };
      }

      const sessionToken = crypto.randomBytes(32).toString('hex');
      db.sessions[sessionToken] = {
        userId,
        createdAt: Date.now(),
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000
      };

      saveDB();

      const encodedUser = Buffer.from(JSON.stringify(user), 'utf8').toString('base64url');
      const maxAge = 30 * 24 * 3600;
      return sendJson(res, 200, {
        ok: true,
        token: sessionToken,
        user,
        workspace: db.workspaces[userId] || null
      }, {
        'Set-Cookie': [
          `cs_session=${sessionToken}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`,
          `cs_user=${encodedUser}; HttpOnly; Path=/; Max-Age=${maxAge}; SameSite=Lax`
        ]
      });
    } catch (e) {
      return sendJson(res, 401, { error: e.message || 'אימות גוגל נכשל' });
    }
  }

  if (pathname === '/api/auth/logout' && req.method === 'POST') {
    const cookies = parseCookies(req);
    if (cookies.cs_session && db.sessions[cookies.cs_session]) {
      delete db.sessions[cookies.cs_session];
      saveDB();
    }
    return sendJson(res, 200, { ok: true }, {
      'Set-Cookie': [
        'cs_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax',
        'cs_user=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax'
      ]
    });
  }

  if (pathname === '/api/workspace' && req.method === 'GET') {
    const user = getAuthUser(req);
    if (!user) return sendJson(res, 401, { error: 'לא מחובר' });
    return sendJson(res, 200, {
      workspace: db.workspaces[user.id] || null
    });
  }

  if (pathname === '/api/workspace' && req.method === 'PUT') {
    const user = getAuthUser(req);
    if (!user) return sendJson(res, 401, { error: 'לא מחובר' });
    try {
      const body = await readJsonBody(req);
      if (!body || !Array.isArray(body.screens)) {
        return sendJson(res, 400, { error: 'נתוני מסך לא תקינים' });
      }
      const updatedAt = new Date().toISOString();
      db.workspaces[user.id] = {
        activeScreenId: body.activeScreenId,
        selectedClassId: body.selectedClassId,
        classLists: body.classLists || [],
        screens: body.screens || [],
        updatedAt
      };
      saveDB();
      return sendJson(res, 200, { ok: true, updatedAt });
    } catch (e) {
      return sendJson(res, 400, { error: e.message });
    }
  }

  if (pathname.startsWith('/api/polls/') && req.method === 'POST' && !pathname.endsWith('/vote')) {
    const pollId = pathname.split('/')[3];
    const body = await readJsonBody(req);
    db.polls[pollId] = {
      id: pollId,
      question: body.question || 'סקר כיתתי',
      options: body.options || [],
      updatedAt: Date.now()
    };
    saveDB();
    return sendJson(res, 200, { ok: true, poll: db.polls[pollId] });
  }

  if (pathname.startsWith('/api/polls/') && req.method === 'GET') {
    const pollId = pathname.split('/')[3];
    const poll = db.polls[pollId];
    if (!poll) return sendJson(res, 404, { error: 'Poll not found' });
    return sendJson(res, 200, { poll });
  }

  if (pathname.startsWith('/api/polls/') && pathname.endsWith('/vote') && req.method === 'POST') {
    const pollId = pathname.split('/')[3];
    const poll = db.polls[pollId];
    if (!poll) return sendJson(res, 404, { error: 'Poll not found' });
    const body = await readJsonBody(req);
    const idx = Number(body.optionIndex);
    if (poll.options[idx]) {
      poll.options[idx].votes = (poll.options[idx].votes || 0) + 1;
      poll.updatedAt = Date.now();
      saveDB();
    }
    return sendJson(res, 200, { ok: true, poll });
  }

  if (pathname.startsWith('/vote/')) {
    const pollId = pathname.split('/')[2];
    const poll = db.polls[pollId];
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    return res.end(renderStudentVotePage(poll));
  }

  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify({ error: 'Not found' }));
};
