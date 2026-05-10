import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const BASE = 'C:/Users/moala/OneDrive/سطح المكتب/كلون موقع الحكيكم/moedesigns-clone-master/public/images/works';
mkdirSync(BASE, { recursive: true });

// All 39 portfolio images from moedesigns.io/works (in page order)
const assets = [
  // Already downloaded in /images/ (shared with homepage) — skip if exists
  // Items 1–12 are in /images/ already as portfolio-*.png
  // New items 13–39:
  { url: 'https://framerusercontent.com/images/4vISaD432PBcu542e6eVbftkyU.png',    name: 'portfolio-jazem.png' },
  { url: 'https://framerusercontent.com/images/mky1VAqRP1X5RQaUGR2M9ZeA.png',     name: 'portfolio-babymillons.png' },
  { url: 'https://framerusercontent.com/images/bUloWX1g1GAFFSf2RTv3WeeqZh0.png',  name: 'portfolio-shua.png' },
  { url: 'https://framerusercontent.com/images/242OdXbInFvLrdojj1kiDEZo3A.png',   name: 'portfolio-iman.png' },
  { url: 'https://framerusercontent.com/images/2koCpmhFBwxdNXwnZZMYX5tY.png',     name: 'portfolio-shaghaf.png' },
  { url: 'https://framerusercontent.com/images/tQxuIcsYnE7oALne9njhl4VPI1E.png',  name: 'portfolio-lulwa.png' },
  { url: 'https://framerusercontent.com/images/QJEvEi917pLH16CawRefx5ec0LI.png',  name: 'portfolio-ghadir.png' },
  { url: 'https://framerusercontent.com/images/IMXSQNRt8w4eDNAlJ1slQQobYU.png',   name: 'portfolio-abdullahg.png' },
  { url: 'https://framerusercontent.com/images/i4g68XMLZssRhlkxij8tCvY6OF8.png',  name: 'portfolio-dunecrest.png' },
  { url: 'https://framerusercontent.com/images/LZOx6fcxqvps2ILzZ5ljO7MttQ8.png',  name: 'portfolio-taqah.png' },
  { url: 'https://framerusercontent.com/images/creUVCi4V757DzRugcAuJehgKOo.png',  name: 'portfolio-niswah.png' },
  { url: 'https://framerusercontent.com/images/dFcng2TT05YmGp6VQRntH2dfZcY.png',  name: 'portfolio-khawla.png' },
  { url: 'https://framerusercontent.com/images/Sz3uSQA6tuBWdeYb5uu8sfV6JVc.png',  name: 'portfolio-funk.png' },
  { url: 'https://framerusercontent.com/images/SMxstUh1TKpPX3WAW5tsWyeM6E.png',   name: 'portfolio-nuqtatayn.png' },
  { url: 'https://framerusercontent.com/images/WbJ78Oa7UIYgief7tjDIljAg18g.png',  name: 'portfolio-alaa.png' },
  { url: 'https://framerusercontent.com/images/W3gink2d87zMa1MrN1WPIjVI8XU.png',  name: 'portfolio-sundus.png' },
  { url: 'https://framerusercontent.com/images/wbwm4lIwGi3GT4czWneONsd14.png',    name: 'portfolio-dima.png' },
  { url: 'https://framerusercontent.com/images/CfGkTVJ3MnghIuJmEoR1CkErRBs.png', name: 'portfolio-waad.png' },
  { url: 'https://framerusercontent.com/images/1W27JsJcWwqJDcOiyckU8dfKXCI.png',  name: 'portfolio-projectplus.png' },
  { url: 'https://framerusercontent.com/images/zVosuFciMQsnt3PoPZGS4CxFQv0.png',  name: 'portfolio-rasaf.png' },
  { url: 'https://framerusercontent.com/images/0zJOQg7Wy4VmRcYDPkAuWGVFQ.png',   name: 'portfolio-jawahir.png' },
  { url: 'https://framerusercontent.com/images/cszqiIrBW5WWcnrN56IfoyLHuaU.png',  name: 'portfolio-meca.png' },
  { url: 'https://framerusercontent.com/images/63um4tLflejEJcxpb9lN6mXfrpE.png',  name: 'portfolio-wafra.png' },
  { url: 'https://framerusercontent.com/images/Qy82J30wpzUriz6sTMt1Q8ru5tM.png',  name: 'portfolio-scrubs.png' },
  { url: 'https://framerusercontent.com/images/8D4LXKJurypGv2NEHcUGCb2tk.png',    name: 'portfolio-anji.png' },
  { url: 'https://framerusercontent.com/images/EWgZoJTbh08mz3vZP2p3b3IOtc.png',   name: 'portfolio-zeina.png' },
  { url: 'https://framerusercontent.com/images/bA0EMEFbzNv7Sd1hR1Tf0I8tYsw.png',  name: 'portfolio-haya.png' },
];

async function download(url, filename) {
  const dest = join(BASE, filename);
  if (existsSync(dest)) { console.log('SKIP (exists)', filename); return; }
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

for (let i = 0; i < assets.length; i += 4) {
  await Promise.all(assets.slice(i, i + 4).map(a => download(a.url, a.name)));
}
console.log('Done.');
