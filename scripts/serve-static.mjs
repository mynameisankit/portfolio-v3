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
  '.webmanifest': 'application/manifest+json',
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
      const target = await resolveFile(requested).then(async (file) => {
        try {
          await stat(file);
          return file;
        } catch (error) {
          if (pathname.startsWith('/studio/') && !path.extname(pathname))
            return path.join(root, 'studio/index.html');
          throw error;
        }
      });
      const body = await readFile(target);
      res.writeHead(200, {
        'Content-Type': types[path.extname(target)] ?? 'application/octet-stream',
        'Cache-Control': 'no-cache',
      });
      res.end(body);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    }
  })
  .listen(Number(process.env.PORT ?? 3000), '127.0.0.1', () =>
    console.log('Portfolio static server ready'),
  );

async function resolveFile(requested) {
  try {
    if (!(await stat(requested)).isDirectory()) return requested;
    const index = path.join(requested, 'index.html');
    try {
      await stat(index);
      return index;
    } catch {
      return `${requested}.html`;
    }
  } catch {
    return path.extname(requested) ? requested : `${requested}.html`;
  }
}
