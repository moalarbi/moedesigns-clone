'use client';
import { useState, useEffect, useRef, CSSProperties } from 'react';
import Image from 'next/image';

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
};

const W = 880; const GUTTER = 40;
function wrap(extra: CSSProperties = {}): CSSProperties {
  return { maxWidth: W, margin: '0 auto', padding: `0 ${GUTTER}px`, width: '100%', ...extra };
}

/* ── Data ── */
const freebies = [
  {
    type: 'كتيّب رقمي',
    iconBg: '#00c763',
    iconType: 'pdf',
    title: 'كيف تبني مشروع استشاري بدايةً من قيمك',
    subtitle: 'ابني نموذج عملك التجاري - the personal MBA مبني على',
    img: '/images/freebies/freebie-pdf.png',
  },
  {
    type: 'مذكّرة',
    iconBg: '#00c763',
    iconType: 'link',
    title: 'مذكّرة اكتشف شغفك',
    subtitle: 'من خلال تأمّل عملك الحالي واكتشاف نقاط قوّتك',
    img: '/images/freebies/freebie-memo.png',
  },
  {
    type: 'ويبنار',
    iconBg: '#ff3b30',
    iconType: 'play',
    title: 'تعلّم تصميم الخدمات',
    subtitle: 'القواعد الأساسيّة لتتعلّم كيف تُصمّم قائمة خدماتك لكفاءة وصافي ربح أعلى بكثير',
    img: '/images/freebies/freebie-webinar.png',
  },
  {
    type: 'اختبار ذاتي',
    iconBg: '#00c763',
    iconType: 'link',
    title: 'خدمات ممنتجة أو مخصّصة؟ 🫣',
    subtitle: 'خدمات مشروع الاستشاري قد تكون مُخصّصة بحسب العميل أو مُمنتجة وجاهزة للجميع. هذا الاختبار يساعدك أن تُحدد الأسلوب الأنسب لك',
    img: '/images/freebies/freebie-quiz.png',
  },
];

/* ── Icons ── */
function TypeIcon({ type, bg }: { type: string; bg: string }) {
  const size = 26;
  const inner = (() => {
    if (type === 'pdf') return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <rect x="2" y="1" width="8" height="12" rx="1" stroke="white" strokeWidth="1.2" fill="none" />
        <path d="M4 5h6M4 7.5h6M4 10h4" stroke="white" strokeWidth="1" strokeLinecap="round" />
      </svg>
    );
    if (type === 'play') return (
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M3 2l7 4-7 4V2z" fill="white" />
      </svg>
    );
    return (
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M5 2H2a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1V8" stroke="white" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8 1h4v4M12 1L7 6" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  })();

  return (
    <div style={{
      width: size, height: size, borderRadius: 6, background: bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {inner}
    </div>
  );
}

function Dots({ size = 13 }: { size?: number }) {
  return <span style={{ fontSize: size, letterSpacing: '3px', color: C.text3, lineHeight: 1, userSelect: 'none' as const }}>···</span>;
}

/* ── Freebie Card ── */
function FreebieCard({ type, iconBg, iconType, title, subtitle, img }: typeof freebies[0]) {
  const [hov, setHov] = useState(false);

  return (
    <a href="#"
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        borderRadius: 12, border: `1px solid ${hov ? C.borderHover : C.border}`,
        padding: '12px', textDecoration: 'none',
        transition: 'border-color 0.2s', overflow: 'hidden', direction: 'rtl',
      }}>
      {/* Header: type badge + dots */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 26 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <TypeIcon type={iconType} bg={iconBg} />
          <span style={{ fontSize: 12, fontWeight: 500, color: C.text2 }}>{type}</span>
        </div>
        <Dots size={11} />
      </div>

      {/* Image */}
      <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden' }}>
        <Image src={img} alt={title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 880px) 100vw, 390px" />
      </div>

      {/* Title + subtitle */}
      <div style={{ paddingTop: 4 }}>
        <p style={{ fontSize: 14, fontWeight: 500, color: C.text1, margin: '0 0 6px', lineHeight: '20px' }}>{title}</p>
        <p style={{ fontSize: 12, color: C.text3, margin: 0, lineHeight: '18px' }}>{subtitle}</p>
      </div>
    </a>
  );
}

/* ── Dropdown ── */
function DropItem({ label, href, icon }: { label: string; href: string; icon?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href={href} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '9px 14px', textDecoration: 'none',
        background: hov ? 'rgba(255,255,255,0.05)' : 'transparent',
        color: hov ? C.text1 : C.text2, fontSize: 13,
        transition: 'background 0.15s, color 0.15s', direction: 'rtl',
      }}>
      <span>{label}</span>
      {icon && <span style={{ fontSize: 14, opacity: 0.7 }}>{icon}</span>}
    </a>
  );
}

/* ── Navbar ── */
function NavbarInner() {
  const [scrolled, setScrolled] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    if (!dropOpen) return;
    const handler = (e: MouseEvent) => {
      if (dotsRef.current && !dotsRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropOpen]);

  return (
    <nav style={{
      position: 'fixed', top: 0, insetInline: 0, zIndex: 200, height: 64,
      background: scrolled ? 'rgba(15,15,15,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{ ...wrap(), height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="/" style={{ flexShrink: 0, display: 'block', width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', background: C.surface }}>
            <Image src="/images/avatar.png" alt="avatar" width={32} height={32} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </a>
          {[
            { label: 'المنتجات', href: '/products' },
            { label: 'الخدمات',  href: '/services' },
            { label: 'الأعمال',  href: '/works' },
            { label: 'المقالات', href: '/blog' },
          ].map(({ label, href }) => {
            const [hov, setHov] = useState(false);
            return (
              <a key={label} href={href}
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{ fontSize: 16, color: hov ? C.text1 : C.text2, textDecoration: 'none', transition: 'color 0.15s' }}>
                {label}
              </a>
            );
          })}
          <div ref={dotsRef} style={{ position: 'relative' }}>
            <span onClick={() => setDropOpen(p => !p)}
              style={{ fontSize: 11, letterSpacing: '3px', color: dropOpen ? C.text2 : C.text3, cursor: 'pointer', userSelect: 'none', lineHeight: 1 }}>
              ···
            </span>
            {dropOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 12px)', right: 0,
                width: 190, background: C.surface,
                border: `1px solid ${C.border}`, borderRadius: 10,
                boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden', zIndex: 300,
              }}>
                <DropItem label="مصادر مجّانيّة" href="/freebies" />
                <DropItem label="البودكاست" href="/podcast" />
                <DropItem label="التواصل" href="/contact" />
                <div style={{ borderTop: `1px solid ${C.border}`, margin: '4px 0' }} />
                <DropItem label="الوضع اللّيلي" href="#" icon="🌙" />
              </div>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Dots size={11} />
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px',
            border: `1px solid ${C.border}`, borderRadius: 8, background: 'transparent',
            fontSize: 13, color: C.text2, textDecoration: 'none',
          }}>ابدأ باستشارة</a>
        </div>
      </div>
    </nav>
  );
}

/* ── Page ── */
export default function FreebiesPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <NavbarInner />
      <main>
        <section style={{ paddingTop: 80 + 64, paddingBottom: 32 }}>
          <div style={wrap()}>
            <h1 style={{ fontSize: 28, fontWeight: 500, color: C.text1, letterSpacing: '-0.84px', margin: '0 0 10px', lineHeight: '36px' }}>
              مصادر مجّانيّة
            </h1>
            <p style={{ fontSize: 16, fontWeight: 500, color: C.text2, margin: 0, lineHeight: '26px' }}>
              لا تقل جودة عن مُنتجاتي المدفوعة
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: 80 }}>
          <div style={wrap()}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16,
            }}>
              {freebies.map((f, i) => <FreebieCard key={i} {...f} />)}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: C.bg, paddingTop: 56, paddingBottom: 40, borderTop: `1px solid ${C.border}` }}>
          <div style={wrap()}>
            <div style={{ marginBottom: 44, maxWidth: 420 }}>
              <p style={{ fontSize: 16, fontWeight: 400, color: C.text1, margin: '0 0 16px', lineHeight: '26px' }}>
                أحدث مقالاتي مباشرة في بريدك الالكتروني
              </p>
              <div style={{ display: 'flex', borderRadius: 8, overflow: 'hidden', border: `1px solid ${C.border}` }}>
                <input type="email" placeholder="بريدك الإلكتروني"
                  style={{ flex: 1, padding: '11px 14px', background: C.surface, border: 'none', outline: 'none', fontSize: 14, color: C.text1, fontFamily: 'inherit', direction: 'rtl' }} />
                <button style={{ padding: '11px 17px', background: C.blue, border: 'none', fontSize: 14, fontWeight: 500, color: '#fff', cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit' }}>اشترك</button>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' as const }}>
              {['Bali / Dubai', 'hala@moedesigns.io', 'نشــرة', 'احجز استشارة 💤'].map((item, i, arr) => {
                const [hov, setHov] = useState(false);
                return (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      style={{ fontSize: 13, color: hov ? C.text2 : C.text3, textDecoration: 'none', transition: 'color 0.15s' }}>{item}</a>
                    {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 14, userSelect: 'none' as const }}>·</span>}
                  </span>
                );
              })}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
