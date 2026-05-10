'use client';
import { useState, useEffect, CSSProperties } from 'react';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS  —  from moedesigns.io
═══════════════════════════════════════════════════ */
const C = {
  bg:          '#0f0f0f',
  surface:     '#171717',
  text1:       '#ededed',
  text2:       '#d9d9d9',
  text3:       '#888888',
  border:      'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  green:       '#00c763',
  blue:        '#2151ff',
  orange:      '#ff7b0f',
};

const W      = 880;
const GUTTER = 40;

function wrap(extra: CSSProperties = {}): CSSProperties {
  return { maxWidth: W, margin: '0 auto', padding: `0 ${GUTTER}px`, width: '100%', ...extra };
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const products = [
  {
    type:  'دورة مسجّلة',
    price: '$249',
    title: 'المنهجيّة "العلميّة" في الكتابة الإعلانيّة',
    img:   '/images/products/product-copywriting.png',
    href:  '#',
  },
  {
    type:  'دورة رقميّة مسجّلة',
    price: '$199',
    title: 'دورة تصميم وبناء المواقع',
    img:   '/images/products/product-webdesign.png',
    href:  '#',
  },
  {
    type:  'كتيّب رقمي تفاعلي',
    price: '$69',
    title: 'كتيّب استراتيجيّة البراند الشخصي',
    img:   '/images/products/product-brand.png',
    href:  '#',
  },
  {
    type:  'دورة مسجّلة',
    price: '$199',
    title: 'أساسيات بناء وتسويق الدورات الرقمية',
    img:   '/images/products/product-courses.png',
    href:  '#',
  },
  {
    type:  'ورشة مسجّلة',
    price: '$35',
    title: 'ورشة الكتابة الإعلانيّة',
    img:   '/images/products/product-workshop.png',
    href:  '#',
  },
];

/* ═══════════════════════════════════════════════════
   TINY PRIMITIVES
═══════════════════════════════════════════════════ */
function Dots({ size = 13 }: { size?: number }) {
  return (
    <span style={{
      fontSize: size, letterSpacing: '3px', color: C.text3,
      lineHeight: 1, userSelect: 'none' as const,
    }}>···</span>
  );
}

/* Shopping-bag icon */
function CartIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="5" width="11" height="7.5" rx="1.5"
        stroke="#888" strokeWidth="1.15" fill="none" />
      <path d="M4.5 5V3.7a2.5 2.5 0 015 0V5"
        stroke="#888" strokeWidth="1.15" strokeLinecap="round" />
    </svg>
  );
}

/* Ghost / outline button */
function GhostBtn({ children, href = '#', small = false }: {
  children: React.ReactNode; href?: string; small?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: small ? '6px 12px' : '8px 14px',
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        borderRadius: 8,
        background: hov ? C.surface : 'transparent',
        fontSize: small ? 12 : 13,
        color: hov ? C.text1 : C.text2,
        textDecoration: 'none',
        transition: 'all 0.18s ease',
        whiteSpace: 'nowrap' as const,
      }}>
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════ */
function NavbarInner() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, insetInline: 0, zIndex: 200,
      height: 64,
      background: scrolled ? 'rgba(15,15,15,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{ ...wrap(), height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* RTL right side: avatar + nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="/" style={{ flexShrink: 0, display: 'block',
            width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
            background: C.surface }}>
            <Image src="/images/avatar.png" alt="avatar" width={32} height={32}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </a>
          {[
            { label: 'المنتجات', href: '/products', active: true },
            { label: 'الخدمات',  href: '/services' },
            { label: 'الأعمال',  href: '#' },
            { label: 'المقالات', href: '#' },
          ].map(({ label, href, active }) => {
            const [hov, setHov] = useState(false);
            return (
              <a key={label} href={href}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                  fontSize: 16,
                  color: hov ? C.text1 : (active ? C.text1 : C.text2),
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                  fontWeight: active ? 500 : 400,
                }}>
                {label}
              </a>
            );
          })}
          <Dots size={11} />
        </div>

        {/* RTL left side: dots + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Dots size={11} />
          <GhostBtn href="#">ابدأ باستشارة</GhostBtn>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   PRODUCT CARD
═══════════════════════════════════════════════════ */
function ProductCard({ type, price, title, img, href }: typeof products[0]) {
  const [hov, setHov] = useState(false);

  return (
    <a href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        width: 392, height: 332,
        borderRadius: 12,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        padding: '12px 16px',
        textDecoration: 'none',
        transition: 'border-color 0.2s ease',
        boxSizing: 'border-box',
        flexShrink: 0,
        /* Cards need explicit RTL since they sit inside a direction:ltr grid */
        direction: 'rtl',
      }}
    >
      {/* ── Top row: dots (left) + type + cart (right) ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 24,
        marginBottom: 8,
      }}>
        {/* In RTL: first child = right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <CartIcon />
          <span style={{ fontSize: 12, fontWeight: 500, color: C.text2 }}>{type}</span>
        </div>
        {/* Second child = left side in RTL */}
        <Dots size={11} />
      </div>

      {/* ── Image ── */}
      <div style={{
        width: 360, height: 240,
        borderRadius: 6,
        overflow: 'hidden',
        position: 'relative',
      }}>
        <Image
          src={img}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="360px"
        />
      </div>

      {/* ── Bottom row: title (right) + price (left) ── */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
        gap: 8,
      }}>
        {/* In RTL: first child = right (title) */}
        <p style={{
          fontSize: 14, fontWeight: 500, color: C.text1,
          margin: 0, lineHeight: '20px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap' as const,
          flex: 1,
        }}>
          {title}
        </p>
        {/* Second child = left (price) */}
        <span style={{
          fontSize: 12, fontWeight: 400, color: C.text2,
          flexShrink: 0, direction: 'ltr',
        }}>
          {price}
        </span>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{ paddingTop: 80 + 64, paddingBottom: 32 }}>
      <div style={wrap()}>
        <h1 style={{
          fontSize: 28, fontWeight: 500, color: C.text1,
          lineHeight: '36px', letterSpacing: '-0.84px',
          margin: '0 0 10px',
        }}>
          المُنتجات
        </h1>
        <p style={{
          fontSize: 16, fontWeight: 500, color: C.text2,
          margin: 0, lineHeight: '26px',
        }}>
          لدي حوالي ٨٠٠ طالب. أغلبهم اشتروا جميع منتجاتي
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PRODUCTS GRID
═══════════════════════════════════════════════════ */
function ProductsGrid() {
  return (
    <section style={{ paddingBottom: 80 }}>
      <div style={wrap()}>
        {/*
          The original site uses a LTR grid inside the RTL page.
          We override direction to ltr so col1 = physical left,
          matching the live site layout.
        */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '392px 392px',
          gap: 16,
          direction: 'ltr',
        }}>
          {products.map((p, i) => (
            <ProductCard key={i} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
═══════════════════════════════════════════════════ */
function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer style={{
      background: C.bg,
      paddingTop: 56, paddingBottom: 40,
      borderTop: `1px solid ${C.border}`,
    }}>
      <div style={wrap()}>
        {/* Newsletter */}
        <div style={{ marginBottom: 44, maxWidth: 420 }}>
          <p style={{ fontSize: 16, fontWeight: 400, color: C.text1, margin: '0 0 16px', lineHeight: '26px' }}>
            أحدث مقالاتي مباشرة في بريدك الالكتروني
          </p>
          <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}` }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="بريدك الإلكتروني"
              style={{
                flex: 1, padding: '11px 14px',
                background: C.surface, border: 'none', outline: 'none',
                fontSize: 14, color: C.text1,
                fontFamily: 'inherit', direction: 'rtl' as const,
              }}
            />
            <button style={{
              padding: '11px 17px',
              background: C.blue, border: 'none',
              fontSize: 14, fontWeight: 500, color: '#fff',
              cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
            }}>
              اشترك
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' as const }}>
          {['Bali / Dubai', 'hala@moedesigns.io', 'نشــرة', 'احجز استشارة 💤'].map((item, i, arr) => {
            const [hov, setHov] = useState(false);
            return (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <a href="#"
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{
                    fontSize: 13, color: hov ? C.text2 : C.text3,
                    textDecoration: 'none', transition: 'color 0.15s',
                  }}>
                  {item}
                </a>
                {i < arr.length - 1 && (
                  <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 14, userSelect: 'none' as const }}>·</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE ROOT
═══════════════════════════════════════════════════ */
export default function ProductsPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <NavbarInner />
      <main>
        <Hero />
        <ProductsGrid />
        <Footer />
      </main>
    </div>
  );
}
