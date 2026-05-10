import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE = 'C:/Users/moala/OneDrive/سطح المكتب/كلون موقع الحكيكم/moedesigns-clone-master/public/images/freebies';
mkdirSync(BASE, { recursive: true });

const assets = [
  { url: 'https://framerusercontent.com/images/fmCiwpNI9nf4g9pRrc2EQRv0HFc.png', name: 'freebie-pdf.png' },
  { url: 'https://framerusercontent.com/images/iAINxBpoAbyswice1VrRBCM.png',     name: 'freebie-memo.png' },
  { url: 'https://framerusercontent.com/images/uSINaz7WVeCYgDd8nGxCuR2TR8.png',  name: 'freebie-webinar.png' },
  { url: 'https://framerusercontent.com/images/FWX9oymJC6aUJPcsZLItRe0mo.png',   name: 'freebie-quiz.png' },
  { url: 'https://framerusercontent.com/images/Qq2jmklcZhVWj1ugAjUycgCGNe8.png', name: 'freebie-extra.png' },
];

async function download(url, filename) {
  const dest = join(BASE, filename);
  if (existsSync(dest)) { console.log('SKIP', filename); return; }
  try {
    const res = await fetch(url);
    if (!res.ok) { console.log('FAIL', filename, res.status); return; }
    const buf = await res.arrayBuffer();
    writeFileSync(dest, Buffer.from(buf));
    console.log('OK', filename);
  } catch (e) {
    console.log('ERR', filename, e.message);
  }
}

for (const a of assets) await download(a.url, a.name);
console.log('Done.');
