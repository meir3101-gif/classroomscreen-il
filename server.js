'use strict';

// Local development server: serves the static site and forwards API routes to
// api/index.js – the same handler Vercel runs in production.
// Usage: npm start  ->  http://localhost:3000

const http = require('http');
const fs = require('fs');
const path = require('path');
const apiHandler = require('./api/index.js');

const PORT = Number(process.env.PORT) || 3000;
const ROOT = __dirname;
const STATIC_FILES = new Set(['/index.html', '/app.js', '/widgets.js', '/audio.js', '/styles.css']);
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, 'http://localhost').pathname;

  if (pathname.startsWith('/api/') || pathname.startsWith('/vote/')) {
    return apiHandler(req, res);
  }

  const file = pathname === '/' ? '/index.html' : pathname;
  if (!STATIC_FILES.has(file)) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Not found');
  }
  fs.readFile(path.join(ROOT, file), (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Server error');
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`Classroomscreen running at http://localhost:${PORT}`);
});
