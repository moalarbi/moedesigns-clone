import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'C:/Users/moala/OneDrive/سطح المكتب/كلون موقع الحكيكم/moedesigns-clone-master/public/images';
mkdirSync(BASE, { recursive: true });

const assets = [
  // Avatar
  { url: 'https://framerusercontent.com/images/fmCiwpNI9nf4g9pRrc2EQRv0HFc.png', name: 'avatar.png' },
  // Portfolio images
  { url: 'https://framerusercontent.com/images/POsOdKKsuf4DwZJtGHtqEs5feGA.png', name: 'portfolio-luniva.png' },
  { url: 'https://framerusercontent.com/images/G8WizqdxAijGKTt9UTc0HVY.png', name: 'portfolio-sharak.png' },
  { url: 'https://framerusercontent.com/images/raYQ3RoMpdkLKJNB2Rjcfs2zaAQ.png', name: 'portfolio-muneera.png' },
  { url: 'https://framerusercontent.com/images/llJvXZ00MzBuL1yrBhyZUv7HPs.png', name: 'portfolio-thra.png' },
  { url: 'https://framerusercontent.com/images/cRTR2fID2Y39XSB73OjLjud0s.png', name: 'portfolio-hamad.png' },
  { url: 'https://framerusercontent.com/images/ZsTFZe70Kup1Hf2hSPNa3Idzms.png', name: 'portfolio-cxhub.png' },
  { url: 'https://framerusercontent.com/images/3Gws4oYlKVizxlOuV0DLTjyvk18.png', name: 'portfolio-treehaus.png' },
  { url: 'https://framerusercontent.com/images/qqO1x0mVfa5qdjZqffoph4FW0E.png', name: 'portfolio-elephantor.png' },
  { url: 'https://framerusercontent.com/images/HKZdoGNdedDFpy7Z0uH51HX6FLA.png', name: 'portfolio-sali.png' },
  { url: 'https://framerusercontent.com/images/YTYtzP1Z9qaT9rJMv9HMrWIwgk.png', name: 'portfolio-sara.png' },
  { url: 'https://framerusercontent.com/images/8RZeiyMgLx4GZSOIyQ7AFt8UJ0.png', name: 'portfolio-hudoor.png' },
  { url: 'https://framerusercontent.com/images/Ov1BoZcF17fNtl6NUYv0ESL9bZk.png', name: 'portfolio-maram.png' },
];

async function download(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) { console.log('SKIP', filename, res.status); return; }
    const buf = await res.arrayBuffer();
    writeFileSync(join(BASE, filename), Buffer.from(buf));
    console.log('OK', filename);
  } catch (e) {
    console.log('ERR', filename, e.message);
  }
}

// Batch 4 at a time
for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(a => download(a.url, a.name)));
}
console.log('Done.');
