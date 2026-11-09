'use strict';

// Security smoke tests for api/index.js.
// Runs entirely in-memory without networking sockets.
// Usage: npm test

const assert = require('assert');
const os = require('os');
const fs = require('fs');
const path = require('path');
const { EventEmitter } = require('events');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cs-test-'));
process.env.CLASSROOMSCREEN_DATA_DIR = tmp;
process.env.GOOGLE_CLIENT_ID = 'test-client.apps.googleusercontent.com';
process.env.SESSION_SECRET = 'test-secret-'.padEnd(64, 'x');

// Mock Google tokeninfo: "good-token" is valid for our client, "other-aud" is for another app.
const realFetch = global.fetch;
global.fetch = async (url, opts) => {
  if (String(url).startsWith('https://oauth2.googleapis.com/tokeninfo')) {
    const token = new URL(url).searchParams.get('id_token');
    const base = {
      iss: 'https://accounts.google.com', sub: '1234567890', email: 'teacher@gmail.com',
      email_verified: 'true', name: 'Teacher', exp: String(Math.floor(Date.now() / 1000) + 3600)
    };
    if (token === 'good-token') return new Response(JSON.stringify({ ...base, aud: process.env.GOOGLE_CLIENT_ID }));
    if (token === 'other-aud') return new Response(JSON.stringify({ ...base, aud: 'evil.apps.googleusercontent.com' }));
    return new Response(JSON.stringify({ error: 'invalid_token' }), { status: 400 });
  }
  return realFetch(url, opts);
};

const handler = require('../api/index.js');

function invokeHandler(path, { method = 'GET', body, cookie } = {}) {
  return new Promise((resolve, reject) => {
    const req = new EventEmitter();
    req.method = method;
    req.url = path;
    req.headers = {
      host: 'localhost',
      'content-type': 'application/json',
      ...(cookie ? { cookie } : {})
    };

    const res = new EventEmitter();
    let statusCode = 200;
    const headers = {};
    let responseBody = '';

    res.writeHead = (code, hdrs = {}) => {
      statusCode = code;
      Object.assign(headers, hdrs);
    };
    res.setHeader = (key, val) => {
      headers[key.toLowerCase()] = val;
    };
    res.getHeader = (key) => headers[key.toLowerCase()];

    res.end = (chunk) => {
      if (chunk) responseBody += chunk;
      resolve({
        status: statusCode,
        headers: {
          get: (name) => {
            const key = Object.keys(headers).find(k => k.toLowerCase() === name.toLowerCase());
            return key ? headers[key] : null;
          }
        },
        text: async () => responseBody,
        json: async () => JSON.parse(responseBody)
      });
    };

    if (body !== undefined) {
      req.body = body;
    }

    handler(req, res).catch(reject);
  });
}

async function main() {
  const req = invokeHandler;
  let passed = 0;
  const test = async (name, fn) => { await fn(); passed++; console.log('  ✓', name); };

  await test('config is read-only', async () => {
    const r = await req('/api/config', { method: 'POST', body: { googleClientId: 'hacked' } });
    assert.strictEqual(r.status, 404);
    const cfg = await (await req('/api/config')).json();
    assert.strictEqual(cfg.googleClientId, process.env.GOOGLE_CLIENT_ID);
  });

  await test('login with only an email is rejected', async () => {
    const r = await req('/api/auth/google', { method: 'POST', body: { googleAccount: { email: 'teacher@gmail.com' } } });
    assert.strictEqual(r.status, 400);
  });

  await test('token issued for another app is rejected', async () => {
    const r = await req('/api/auth/google', { method: 'POST', body: { credential: 'other-aud' } });
    assert.strictEqual(r.status, 401);
  });

  await test('invalid token is rejected', async () => {
    const r = await req('/api/auth/google', { method: 'POST', body: { credential: 'garbage' } });
    assert.strictEqual(r.status, 401);
  });

  let cookie;
  await test('valid Google token logs in and sets a signed session', async () => {
    const r = await req('/api/auth/google', {
      method: 'POST',
      body: { credential: 'good-token', initialWorkspace: { screens: [{ id: 's1' }], classLists: [] } }
    });
    assert.strictEqual(r.status, 200);
    const setCookie = r.headers.get('set-cookie');
    assert.match(setCookie, /cs_session=[^;]+\.[^;]+; HttpOnly/);
    cookie = setCookie.split(';')[0];
    const me = await (await req('/api/auth/me', { cookie })).json();
    assert.strictEqual(me.authenticated, true);
    assert.strictEqual(me.user.email, 'teacher@gmail.com');
    assert.strictEqual(me.workspace.screens[0].id, 's1');
  });

  await test('forged legacy cs_user cookie is ignored', async () => {
    const forged = Buffer.from(JSON.stringify({ id: 'g_1234567890', email: 'teacher@gmail.com' })).toString('base64url');
    const r = await req('/api/workspace', { cookie: `cs_user=${forged}` });
    assert.strictEqual(r.status, 401);
  });

  await test('tampered session cookie is rejected', async () => {
    const [payload, sig] = cookie.split('=')[1].split('.');
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    data.uid = 'g_someone_else';
    const tampered = `cs_session=${Buffer.from(JSON.stringify(data)).toString('base64url')}.${sig}`;
    assert.strictEqual((await req('/api/workspace', { cookie: tampered })).status, 401);
  });

  await test('workspace save + load', async () => {
    const put = await req('/api/workspace', { method: 'PUT', cookie, body: { screens: [{ id: 's2' }], activeScreenId: 's2' } });
    assert.strictEqual(put.status, 200);
    const got = await (await req('/api/workspace', { cookie })).json();
    assert.strictEqual(got.workspace.activeScreenId, 's2');
  });

  const ownerKey = 'k'.repeat(48);
  await test('poll create, vote, and read', async () => {
    const r = await req('/api/polls/ptest1234567', { method: 'POST', body: { ownerKey, question: 'Q?', options: [{ label: 'A', votes: 0 }, { label: 'B', votes: 0 }] } });
    assert.strictEqual(r.status, 200);
    await Promise.all([1, 2, 3].map(() => req('/api/polls/ptest1234567/vote', { method: 'POST', body: { optionIndex: 1 } })));
    const poll = (await (await req('/api/polls/ptest1234567')).json()).poll;
    assert.deepStrictEqual(poll.options.map((o) => o.votes), [0, 3]);
    assert.strictEqual(poll.ownerHash, undefined);
  });

  await test('poll cannot be hijacked without the owner key', async () => {
    const r = await req('/api/polls/ptest1234567', { method: 'POST', body: { ownerKey: 'x'.repeat(48), question: 'pwned', options: [] } });
    assert.strictEqual(r.status, 403);
    const r2 = await req('/api/polls/ptest1234567', { method: 'POST', body: { question: 'pwned', options: [] } });
    assert.strictEqual(r2.status, 400);
  });

  await test('vote page escapes HTML', async () => {
    await req('/api/polls/pxss12345678', {
      method: 'POST',
      body: { ownerKey, question: '<script>alert(1)</script>', options: [{ label: '<img src=x onerror=alert(1)>' }] }
    });
    const html = await (await req('/vote/pxss12345678')).text();
    assert.ok(!html.includes('<script>alert(1)</script>'));
    assert.ok(!html.includes('<img src=x'));
    assert.ok(html.includes('&lt;script&gt;'));
  });

  await test('logout clears cookies', async () => {
    const r = await req('/api/auth/logout', { method: 'POST', cookie });
    const sc = r.headers.get('set-cookie');
    const scStr = Array.isArray(sc) ? sc.join('; ') : String(sc);
    assert.match(scStr, /cs_session=;/);
  });

  fs.rmSync(tmp, { recursive: true, force: true });
  console.log(`\n${passed} tests passed`);
}

main().catch((err) => {
  console.error('\n✗ TEST FAILED:', err);
  process.exit(1);
});
