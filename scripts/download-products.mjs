import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = 'C:/Users/moala/OneDrive/سطح المكتب/كلون موقع الحكيكم/moedesigns-clone-master/public/images/products';
mkdirSync(BASE, { recursive: true });

const assets = [
  { url: 'https://framerusercontent.com/images/0se08sgCTQIu8ohZZvvXc1DVWA.png', name: 'product-copywriting.png' },
  { url: 'https://framerusercontent.com/images/SwuOqGFtVVWy9ZfUBQiqgNjLcw.png', name: 'product-webdesign.png' },
  { url: 'https://framerusercontent.com/images/Z87MpYmEVw5Ok51ssmAQUa1tmo.png', name: 'product-brand.png' },
  { url: 'https://framerusercontent.com/images/iN7hdp77u22BlmGGct440DClhk.png', name: 'product-courses.png' },
  { url: 'https://framerusercontent.com/images/lIxJMPDL44G8O4ZIUt488ci8Uc.png', name: 'product-workshop.png' },
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

for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(a => download(a.url, a.name)));
}
console.log('Done.');
