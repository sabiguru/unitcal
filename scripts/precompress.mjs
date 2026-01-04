import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, extname } from 'path';
import { brotliCompressSync, constants, gzipSync } from 'zlib';

const roots = ['.next/static', 'public']; // compress both Next.js static and public assets
const exts = new Set(['.js', '.css', '.json', '.svg', '.xml', '.txt', '.map', '.html']);

async function walk(dir) {
  try {
    for (const name of await readdir(dir)) {
      const p = join(dir, name);
      const s = await stat(p);
      if (s.isDirectory()) {
        await walk(p);
      } else if (exts.has(extname(p)) && !p.endsWith('.br') && !p.endsWith('.gz')) {
        const buf = await readFile(p);
        
        // Only compress files larger than 1KB
        if (buf.length > 1024) {
          // Brotli compression
          const br = brotliCompressSync(buf, { 
            params: { [constants.BROTLI_PARAM_QUALITY]: 6 } 
          });
          await writeFile(p + '.br', br);
          console.log(`Brotli: ${p} (${buf.length} → ${br.length} bytes)`);
          
          // Gzip compression
          const gz = gzipSync(buf, { level: 6 });
          await writeFile(p + '.gz', gz);
          console.log(`Gzip: ${p} (${buf.length} → ${gz.length} bytes)`);
        }
      }
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Error processing ${dir}:`, err.message);
    }
  }
}

console.log('Starting precompression...');
for (const r of roots) {
  console.log(`Processing ${r}...`);
  await walk(r);
}
console.log('Precompression done.');