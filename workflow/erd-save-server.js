const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const ROOT = __dirname;
const HOST = '127.0.0.1';
const PORT = Number(process.env.PORT || 5179);
const TARGET_FILE = 'so-do-crm-actor-v2.html';
const TARGET_PATH = path.join(ROOT, TARGET_FILE);

const ERD_SIZE_RE = /(\s*const\s+HDR\s*=\s*32\s*,\s*ROW\s*=\s*27\s*,\s*PAD\s*=\s*13\s*,\s*VW\s*=\s*)[^,;]+(\s*,\s*VH\s*=\s*)[^;]+;/;
const ERD_DATA_RE = /  const tables = \[\n[\s\S]*?\n  const AH = \[[^\n]*\];/;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8'
};

function send(res, status, body, type = 'application/json; charset=utf-8') {
  res.writeHead(status, {
    'Content-Type': type,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  });
  res.end(body);
}

async function readJson(req) {
  let body = '';
  for await (const chunk of req) {
    body += chunk;
    if (body.length > 2_000_000) throw new Error('Payload quá lớn.');
  }
  return JSON.parse(body || '{}');
}

function patchTargetHtml(html, payload) {
  const vw = Number(payload.vw) || 1250;
  const vh = Number(payload.vh) || 1000;
  let code = String(payload.code || '').trimEnd();
  if (!code.startsWith('  const tables = [') || !code.includes('\n  const links = [') || !code.includes('\n  const AH = [')) {
    throw new Error('Dữ liệu ERD gửi lên không hợp lệ.');
  }
  if (!code.includes("let defs = '', body = '';")) {
    code = code.replace('\n  const AH = [', "\n  let defs = '', body = '';\n  const AH = [");
  }

  const htmlToPatch = html.replace(ERD_SIZE_RE, (_, pre, mid) => `${pre}${vw}${mid}${vh};`);

  if (!ERD_DATA_RE.test(htmlToPatch)) {
    throw new Error('Không tìm thấy khối const tables / const links / const AH trong file đích.');
  }
  return htmlToPatch.replace(ERD_DATA_RE, code);
}

async function serveFile(req, res) {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const name = url.pathname === '/' ? 'erd-editor.html' : decodeURIComponent(url.pathname.slice(1));
  const full = path.resolve(ROOT, name);
  if (!full.startsWith(ROOT + path.sep)) return send(res, 403, 'Forbidden', 'text/plain; charset=utf-8');

  try {
    const data = await fs.readFile(full);
    send(res, 200, data, TYPES[path.extname(full)] || 'application/octet-stream');
  } catch {
    send(res, 404, 'Not found', 'text/plain; charset=utf-8');
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') return send(res, 204, '');

  if (req.method === 'POST' && req.url === '/save-erd') {
    try {
      const payload = await readJson(req);
      if (payload.target && payload.target !== TARGET_FILE) throw new Error(`Chỉ được ghi vào ${TARGET_FILE}.`);

      const html = await fs.readFile(TARGET_PATH, 'utf8');
      await fs.writeFile(TARGET_PATH, patchTargetHtml(html, payload), 'utf8');
      return send(res, 200, JSON.stringify({ ok: true, target: TARGET_FILE }));
    } catch (error) {
      return send(res, 400, JSON.stringify({ ok: false, error: error.message }));
    }
  }

  if (req.method === 'GET') return serveFile(req, res);
  send(res, 405, 'Method not allowed', 'text/plain; charset=utf-8');
});

server.on('error', error => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Cổng ${HOST}:${PORT} đang được dùng. Hãy mở http://${HOST}:${PORT}/erd-editor.html hoặc tắt process cũ rồi chạy lại.`);
    process.exit(1);
  }
  throw error;
});

server.listen(PORT, HOST, () => {
  console.log(`ERD editor: http://${HOST}:${PORT}/erd-editor.html`);
  console.log(`Saving target: ${TARGET_PATH}`);
});
