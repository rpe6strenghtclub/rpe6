const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, '..');
const types = {
  ".css": "text/css",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
};

http
  .createServer((request, response) => {
    let pathname;
    try { pathname = decodeURIComponent(request.url.split("?")[0]); }
    catch { response.writeHead(400).end('Invalid URL'); return; }
    const relativePath = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
    const filePath = path.resolve(root, relativePath);

    const relative = path.relative(root, filePath);
    if (relative === '..' || relative.startsWith('..' + path.sep) || path.isAbsolute(relative)) {
      response.writeHead(403).end();
      return;
    }

    fs.realpath(filePath, (pathError, resolved) => {
      if (pathError) { response.writeHead(404).end('Not found'); return; }
      const realRelative = path.relative(root, resolved);
      if (realRelative === '..' || realRelative.startsWith('..' + path.sep) || path.isAbsolute(realRelative)) {
        response.writeHead(403).end(); return;
      }
      fs.readFile(resolved, (error, content) => {
      if (error) {
        response.writeHead(404).end("Not found");
        return;
      }

      response.writeHead(200, { "Content-Type": types[path.extname(filePath)] || "application/octet-stream" });
      response.end(content);
      });
    });
  })
  .listen(Number(process.env.PORT || 4173), "127.0.0.1");
