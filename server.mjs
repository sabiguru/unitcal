import express from 'express';
import next from 'next';
//import compression from 'compression';
import { join } from 'path';
//import expressStaticGzip from 'express-static-gzip';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

await app.prepare();
const server = express();

// If a proxy/CDN fronts you:
server.set('trust proxy', 1);

// Gzip dynamic responses (HTML/SSR/API)
//server.use(compression({ level: 6, threshold: 1024 }));

// Serve precompressed Next static assets (Brotli first, then gzip)
const staticDir = join(process.cwd(), '.next', 'static');
//server.use('/_next/static', expressStaticGzip(staticDir, {
//  enableBrotli: true,
//  orderPreference: ['br', 'gz'],
//  serveStatic: {
//    immutable: true,
//    maxAge: '365d',
 //   setHeaders(res) { res.setHeader('Vary', 'Accept-Encoding'); }
 // }
//})
//);

// Public assets (not precompressed by default)
const publicDir = join(process.cwd(), 'public');
server.use(express.static(publicDir, {
  maxAge: '30d',
  setHeaders(res) { res.setHeader('Vary', 'Accept-Encoding'); }
}));

// Everything else via Next
server.use((req, res) => handle(req, res));

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));
