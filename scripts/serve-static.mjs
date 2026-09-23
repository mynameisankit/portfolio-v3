import { readFile, stat } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
const root = path.resolve('out');
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.json': 'application/json',
  '.txt': 'text/plain',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      const requested = path.resolve(root, `.${pathname}`);
      if (requested !== root && !requested.startsWith(root + path.sep)) {
        res.writeHead(403).end();
        return;
      }
      const target = await resolveFile(requested);
      const body = await readFile(target);
      res.writeHead(200, {
        'Content-Type': types[path.extname(target)] ?? 'application/octet-stream',
      });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  })
  .listen(3000, '127.0.0.1', () => console.log('Portfolio: http://127.0.0.1:3000'));

async function resolveFile(requested) {
  try {
    return (await stat(requested)).isDirectory() ? path.join(requested, 'index.html') : requested;
  } catch {
    return path.extname(requested) ? requested : `${requested}.html`;
  }
}
