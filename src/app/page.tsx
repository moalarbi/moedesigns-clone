'use client';
import { useState, useEffect, useRef, CSSProperties } from 'react';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS  —  extracted from moedesigns.io
═══════════════════════════════════════════════════ */
const C = {
  bg:          '#0f0f0f',
  surface:     '#171717',
  surface2:    '#1e1e1e',
  text1:       '#ededed',   // rgb(237,237,237) — confirmed from site
  text2:       '#d9d9d9',   // rgb(217,217,217) — confirmed from site
  text3:       '#888888',
  border:      'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  green:       '#00c763',
  blue:        '#2151ff',
  orange:      '#ff7b0f',
  orangeBg:    'rgba(255,123,15,0.12)',
};

/* Container — confirmed 880px maxWidth with 40px gutters from live site */
const W = 880;
const GUTTER = 40;

function wrap(extra: CSSProperties = {}): CSSProperties {
  return {
    maxWidth: W,
    margin: '0 auto',
    padding: `0 ${GUTTER}px`,
    width: '100%',
    ...extra,
  };
}

/* ═══════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════ */
const portfolio = [
  { name: 'Luniva',                 type: 'موقع تجاري',       img: '/images/portfolio-luniva.png',     bg: '#b8874e' },
  { name: 'شارك - Coworking',       type: 'موقع تجاري',       img: '/images/portfolio-sharak.png',     bg: '#252525' },
  { name: 'منيرة | الاحتراق الوظيفي', type: 'منصّة تدريبيّة', img: '/images/portfolio-muneera.png',    bg: '#18182a' },
  { name: 'ثرى للعقار',             type: 'موقع تجاري',       img: '/images/portfolio-thra.png',       bg: '#1c2a1c' },
  { name: 'حمد راشد الشامسي',       type: 'موقع شخصي',       img: '/images/portfolio-hamad.png',      bg: '#1a1a1a' },
  { name: 'CX Hub Saudi',           type: 'موقع تجاري',       img: '/images/portfolio-cxhub.png',      bg: '#0f1219' },
];

const clients = [
  'wfrah', 'McKinsey & Company', 'Mindvalley', 'رصف', 'Klive',
  'فنك', 'MIDDLE CAIRO ASSOCIATION', 'Mastercard',
];

const products = [
  { type: 'دورة مسجّلة',        title: 'المنهجيّة "العلميّة" في الكتابة الإعلانيّة', price: '$249', img: '/images/portfolio-thra.png' },
  { type: 'دورة رقميّة مسجّلة', title: 'دورة تصميم وبناء المواقع',                    price: '$199', img: '/images/portfolio-luniva.png' },
  { type: 'كتيّب رقمي تفاعلي', title: 'كتيّب استراتيجيّة البراند الشخصي',            price: '$69',  img: '/images/portfolio-sharak.png' },
  { type: 'دورة مسجّلة',        title: 'أساسيات بناء وتسويق الدورات الرقمية',          price: '$199', img: '/images/portfolio-muneera.png' },
];

const pills = [
  'البيع والتسعير', 'السوشال ميديا والإعلام', 'التسويق والتوسّع',
  'الاستراتيجيّة والتمركز', 'بناء المشروع والمنتجات',
];

const articles = [
  { title: '٤ قِيَم. كُل أصحاب البراندات الناجحة كانت عندهم',                     thumb: '/images/portfolio-hamad.png' },
  { title: 'منهجيّتي لبيع الخدمات الأغلى | Hight ticket',                        thumb: null },
  { title: 'تقرير: هل ما زال بيع الدورات مشروع مُربح؟',                           thumb: '/images/portfolio-thra.png' },
  { title: '٣ أسئلة قبل أن أبدأ بأي مشروع',                                      thumb: null },
  { title: 'درست حَملات أفضل من يبيعون المنتجات الرقميّة. اتّضح أن لديهم سر...',  thumb: '/images/portfolio-luniva.png' },
  { title: 'التخصّص يحميك من تحيّزاتك الفكريّة',                                  thumb: null },
];

/* ═══════════════════════════════════════════════════
   TINY PRIMITIVES
═══════════════════════════════════════════════════ */
function GreenDot() {
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 7,
      borderRadius: '50%', background: C.green, flexShrink: 0,
    }} />
  );
}

function Dots({ size = 13 }: { size?: number }) {
  return (
    <span style={{
      fontSize: size, letterSpacing: '3px', color: C.text3,
      lineHeight: 1, userSelect: 'none' as const,
    }}>···</span>
  );
}

function Divider() {
  return <div style={{ height: 1, background: C.border }} />;
}

/* Carousel arrow button */
function ArrowBtn({ onClick, dir }: { onClick: () => void; dir: 'prev' | 'next' }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        width: 34, height: 34, borderRadius: '50%',
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        background: hov ? C.surface : 'transparent',
        color: hov ? C.text1 : C.text3,
        fontSize: 16, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all 0.18s ease',
        flexShrink: 0,
      }}
    >
      {dir === 'prev' ? '›' : '‹'}
    </button>
  );
}

/* Section header — title on right (RTL start), optional action on left */
function SectionHead({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 28,
    }}>
      {action ?? <span />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 18, fontWeight: 500, color: C.text1 }}>{title}</span>
        <span style={{ fontSize: 15, color: C.text3 }}>←</span>
      </div>
    </div>
  );
}

/* Ghost / outline button */
function GhostBtn({
  children, href = '#', small = false,
}: {
  children: React.ReactNode; href?: string; small?: boolean;
}) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
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
      }}
    >
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   NAVBAR
   — confirmed: 68px total height, 16px top/bottom padding
   — nav links: 16px, color #d9d9d9
═══════════════════════════════════════════════════ */
function Navbar() {
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
      <div style={{
        ...wrap(), height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* ── RTL: right side — avatar + nav links ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          {/* Avatar — links to homepage */}
          <a href="/" style={{ flexShrink: 0, display: 'block',
            width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
            background: C.surface }}>
            <Image src="/images/avatar.png" alt="avatar" width={32} height={32}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </a>

          {/* Nav links */}
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
                style={{
                  fontSize: 16, color: hov ? C.text1 : C.text2,
                  textDecoration: 'none', transition: 'color 0.15s',
                }}>
                {label}
              </a>
            );
          })}

          <Dots size={11} />
        </div>

        {/* ── RTL: left side — dots + CTA ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Dots size={11} />
          <GhostBtn href="#">ابدأ باستشارة</GhostBtn>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   — confirmed: paddingTop 100px, paddingBottom 64px
   — H1: 28px / 500 / #ededed / -0.84px / 36px line-height
   — cards: 200×74px / #171717 / 12px radius / 12px 16px pad / 16px gap
═══════════════════════════════════════════════════ */
const heroCards = [
  { label: 'ابدأ معي',  value: 'احجز استشارة',            dot: true },
  { label: 'المقالات',  value: '١٥٠ مقال في بيع الخبرات', dot: false },
  { label: 'اعمل معي', value: 'خدماتي والباقات',          dot: false },
];

function Hero() {
  return (
    <section style={{
      background: C.bg,
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      paddingTop: 64,
    }}>
      <div style={wrap()}>
        {/* Headline */}
        <div style={{ paddingTop: 100, paddingBottom: 32 }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 500,
            lineHeight: '36px',
            letterSpacing: '-0.84px',
            color: C.text1,
            maxWidth: 380,
            margin: 0,
          }}>
            مستشار في بناء المشاريع الاستشاريّة والتدريبيّة.{' '}
            <span style={{ color: C.text3 }}>رائد أعمال وكاتب.</span>
          </h1>
        </div>

        {/* Cards row — 16px gap confirmed from live site */}
        <div style={{ display: 'flex', gap: 16 }}>
          {heroCards.map((c, i) => {
            const [hov, setHov] = useState(false);
            return (
              <a key={i} href="#"
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                  display: 'flex', flexDirection: 'column', gap: 6,
                  background: hov ? C.surface2 : C.surface,
                  border: `1px solid rgba(255,255,255,${hov ? 0.1 : 0.06})`,
                  borderRadius: 12,
                  padding: '12px 16px',
                  width: 200, height: 74,
                  textDecoration: 'none',
                  transition: 'background 0.18s, border-color 0.18s',
                  flexShrink: 0,
                }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, color: C.text3 }}>{c.label}</span>
                  {c.dot ? <GreenDot /> : <Dots size={10} />}
                </div>
                <span style={{ fontSize: 14, color: C.text2, lineHeight: '20px' }}>{c.value}</span>
              </a>
            );
          })}
        </div>

        {/* Scroll hint */}
        <div style={{ paddingTop: 64, paddingBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: C.text3 }}>
            <span style={{ fontSize: 13 }}>أحدث أعمالي</span>
            <span style={{ fontSize: 13 }}>←</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PORTFOLIO CAROUSEL
   — confirmed: card 333×222px image, 16px gap
═══════════════════════════════════════════════════ */
function Portfolio() {
  const [idx, setIdx] = useState(0);
  const CARD = 333;
  const GAP  = 16;
  const MAX  = portfolio.length - 2;

  return (
    <section style={{ background: C.bg, paddingBottom: 64 }}>
      <div style={wrap()}>
        <SectionHead title="أحدث أعمالي" />

        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'flex', gap: GAP,
            transform: `translateX(${idx * (CARD + GAP)}px)`,
            transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {portfolio.map((item, i) => (
              <a key={i} href="#" style={{
                flexShrink: 0, width: CARD,
                textDecoration: 'none',
                display: 'block',
              }}>
                {/* Image container — 222px height confirmed */}
                <div style={{
                  height: 222, borderRadius: 10, overflow: 'hidden',
                  background: item.bg, position: 'relative',
                }}>
                  <Image src={item.img} alt={item.name} fill
                    style={{ objectFit: 'cover', objectPosition: 'top center' }} />
                </div>

                {/* Caption */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingTop: 10,
                }}>
                  <span style={{ fontSize: 11, color: C.text3 }}>{item.type}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: C.text1 }}>{item.name}</span>
                    <Dots size={10} />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation arrows */}
        <div style={{ display: 'flex', gap: 6, marginTop: 20, justifyContent: 'flex-end' }}>
          <ArrowBtn dir="prev" onClick={() => setIdx(p => Math.max(0, p - 1))} />
          <ArrowBtn dir="next" onClick={() => setIdx(p => Math.min(MAX, p + 1))} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   STATS CARD
   — confirmed: paddingTop 64px, paddingBottom 64px, gap 40px
═══════════════════════════════════════════════════ */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: 'rgba(255,255,255,0.06)',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 5,
      padding: '1px 9px',
      fontSize: 17, fontWeight: 400, color: C.text1,
      whiteSpace: 'nowrap' as const,
    }}>
      {children}
    </span>
  );
}

function Stats() {
  return (
    <section style={{ background: C.bg, paddingTop: 0, paddingBottom: 64 }}>
      <div style={wrap()}>
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: '36px 40px',
          maxWidth: 720,
        }}>
          <p style={{
            fontSize: 17, color: C.text3,
            lineHeight: '34px',
            margin: '0 0 16px',
            display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px',
          }}>
            <span>خلال</span>
            <Pill>٧ سنوات</Pill>
            <span>ساعدت</span>
            <Pill>80+</Pill>
            <span>مؤسّس ليبدأ مشروعه في بيع الخبرات. عُملائي يشهدون بعائد استثمار يبدأ من</span>
            <Pill>400%</Pill>
            <span>خلال السنة الأولى</span>
          </p>
          <p style={{ fontSize: 15, color: C.text3, lineHeight: '26px', margin: 0 }}>
            تشمل{' '}
            <a href="#" style={{
              color: C.text2, textDecoration: 'none',
              borderBottom: `1px solid rgba(255,255,255,0.12)`,
            }}>خدماتي</a>
            {' '}باقات في تأسيس المشروع أو المُساعدة في توسعته. عموماً أساعدك أن تنتقل في بيع الخبرات من هواية ومُقايضة الوقت بالمال إلى شركة من فرد واحد.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CLIENTS TICKER
═══════════════════════════════════════════════════ */
function ClientsTicker() {
  const doubled = [...clients, ...clients];
  return (
    <section style={{ background: C.bg, paddingBottom: 64, overflow: 'hidden' }}>
      <Divider />
      <div style={{ paddingTop: 32, paddingBottom: 32, overflow: 'hidden' }}>
        <div className="scroll-ticker" style={{
          display: 'flex', gap: 56, flexShrink: 0,
          alignItems: 'center', whiteSpace: 'nowrap' as const,
        }}>
          {doubled.map((logo, i) => (
            <span key={i} style={{
              fontSize: 14, fontWeight: 400,
              color: 'rgba(255,255,255,0.18)',
              flexShrink: 0, letterSpacing: 0.3,
            }}>{logo}</span>
          ))}
        </div>
      </div>
      <Divider />
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   NASHRA SECTION
   — mockup placed first (RTL: → physical right column)
   — text placed second (RTL: → physical left column)
═══════════════════════════════════════════════════ */
function Nashra() {
  return (
    <section style={{ background: C.bg, paddingBottom: 64 }}>
      <div style={wrap()}>
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
        }}>

          {/* ── Mockup side (first child → RTL right column) ── */}
          <div style={{
            background: '#0c0c0c',
            borderInlineStart: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 32,
          }}>
            <div style={{
              background: '#111',
              borderRadius: 12, padding: 20,
              width: '100%', maxWidth: 270,
              border: '1px solid rgba(255,255,255,0.07)',
            }}>
              {/* Faux URL bar */}
              <div style={{ display: 'flex', gap: 5, marginBottom: 14, alignItems: 'center' }}>
                <div style={{ height: 6, flex: 2, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
                <div style={{ height: 6, flex: 3, background: 'rgba(255,123,15,0.25)', borderRadius: 3 }} />
                <div style={{ height: 6, flex: 1, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
              </div>
              {/* Newsletter header card */}
              <div style={{
                background: 'linear-gradient(135deg, #1a1a2c 0%, #0d0d1a 100%)',
                borderRadius: 8, padding: '14px 12px', marginBottom: 10,
              }}>
                <div style={{ height: 5, background: 'rgba(255,255,255,0.15)', borderRadius: 3, width: '70%', marginBottom: 6 }} />
                <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, width: '45%' }} />
              </div>
              {/* Email input */}
              <div style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 6, padding: '8px 10px',
                fontSize: 10, color: 'rgba(255,255,255,0.25)',
                marginBottom: 8, direction: 'ltr' as const,
              }}>
                Email Address
              </div>
              {/* Submit button */}
              <div style={{
                background: C.blue, borderRadius: 6,
                padding: '8px 10px',
                fontSize: 10, color: '#fff',
                textAlign: 'center' as const, fontWeight: 500,
                direction: 'ltr' as const,
              }}>
                Join Us →
              </div>
              {/* Powered by */}
              <p style={{
                fontSize: 9, color: 'rgba(255,255,255,0.2)',
                textAlign: 'center' as const, margin: '10px 0 0',
              }}>
                Powered by Nashra
              </p>
              {/* Carousel dots */}
              <div style={{ display: 'flex', gap: 5, justifyContent: 'center', marginTop: 12 }}>
                {[C.orange, 'rgba(255,255,255,0.15)', 'rgba(255,255,255,0.15)'].map((bg, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: bg }} />
                ))}
              </div>
            </div>
          </div>

          {/* ── Content side (second child → RTL left column) ── */}
          <div style={{
            padding: '44px 40px',
            display: 'flex', flexDirection: 'column', gap: 20,
          }}>
            {/* Orange badge */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: C.orangeBg,
              border: '1px solid rgba(255,123,15,0.2)',
              borderRadius: 6,
              padding: '3px 10px',
              alignSelf: 'flex-start',
              fontSize: 12, color: C.orange,
            }}>
              ↓ Nashra.ai
            </span>

            {/* Heading */}
            <div>
              <h3 style={{
                fontSize: 20, fontWeight: 400, color: C.text1,
                margin: '0 0 4px', lineHeight: 1.45,
              }}>
                نشرتك البريديّة + مدوّنتك
              </h3>
              <p style={{
                fontSize: 20, fontWeight: 400, color: C.text3,
                margin: 0, lineHeight: 1.45,
              }}>
                تواصل مع متابعينك مباشرة
              </p>
            </div>

            {/* CTA */}
            <div>
              <GhostBtn>الاشتراك والتفاصيل</GhostBtn>
            </div>

            {/* Feature tags */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
              {['تدعم الكتابة بالعربي', 'صفحات هبوط', 'تصميم محمّد الحكيم'].map((f, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.03)',
                  border: `1px solid ${C.border}`,
                  borderRadius: 6, padding: '5px 11px',
                  alignSelf: 'flex-start',
                }}>
                  <span style={{
                    width: 4, height: 4, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.2)', flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 13, color: C.text3 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PRODUCTS CAROUSEL
═══════════════════════════════════════════════════ */
function Products() {
  const [idx, setIdx] = useState(0);
  const CARD = 210;
  const GAP  = 12;
  const MAX  = products.length - 3;

  return (
    <section style={{ background: C.bg, paddingBottom: 64 }}>
      <div style={wrap()}>
        <SectionHead title="أحدث المنتجات" />

        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'flex', gap: GAP,
            transform: `translateX(${idx * (CARD + GAP)}px)`,
            transition: 'transform 0.42s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {products.map((p, i) => {
              const [hov, setHov] = useState(false);
              return (
                <a key={i} href="#"
                  onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{
                    flexShrink: 0, width: CARD,
                    display: 'block',
                    background: C.surface,
                    border: `1px solid ${hov ? C.borderHover : C.border}`,
                    borderRadius: 10, overflow: 'hidden',
                    textDecoration: 'none',
                    transition: 'border-color 0.18s',
                  }}>
                  <div style={{ height: 128, overflow: 'hidden', position: 'relative' }}>
                    <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px 14px' }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'center', marginBottom: 5,
                    }}>
                      <span style={{ fontSize: 10, color: C.orange }}>{p.price}</span>
                      <span style={{ fontSize: 11, color: C.text3 }}>{p.type}</span>
                    </div>
                    <p style={{
                      fontSize: 13, fontWeight: 400, color: C.text1,
                      margin: 0, lineHeight: '19px',
                    }}>{p.title}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 6, marginTop: 18, justifyContent: 'flex-end' }}>
          <ArrowBtn dir="prev" onClick={() => setIdx(p => Math.max(0, p - 1))} />
          <ArrowBtn dir="next" onClick={() => setIdx(p => Math.min(MAX, p + 1))} />
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES PILLS TICKER
═══════════════════════════════════════════════════ */
function ServicesTicker() {
  const tripled = [...pills, ...pills, ...pills];
  return (
    <section style={{ background: C.bg, paddingBottom: 64, overflow: 'hidden' }}>
      <div style={{ overflow: 'hidden' }}>
        <div className="scroll-ticker" style={{
          display: 'flex', gap: 8, flexShrink: 0, alignItems: 'center',
        }}>
          {tripled.map((pill, i) => (
            <span key={i} style={{
              flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: C.orangeBg,
              border: '1px solid rgba(255,123,15,0.15)',
              borderRadius: 5, padding: '5px 11px',
              fontSize: 13, color: C.orange,
              whiteSpace: 'nowrap' as const,
            }}>
              <Dots size={9} />
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ARTICLES — fade-in on scroll
═══════════════════════════════════════════════════ */
function Articles() {
  const [show, setShow] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setShow(true); },
      { threshold: 0.05 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: C.bg, paddingBottom: 64 }}>
      <div style={wrap()}>
        <SectionHead title="آخر المقالات" />

        <div>
          {articles.map((art, i) => {
            const [hov, setHov] = useState(false);
            return (
              <a key={i} href="#"
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                  display: 'flex', alignItems: 'center',
                  justifyContent: 'space-between', gap: 16,
                  padding: '14px 0',
                  borderBottom: `1px solid ${C.border}`,
                  textDecoration: 'none',
                  opacity: show ? 1 : 0,
                  transform: show ? 'translateY(0)' : 'translateY(8px)',
                  transition: `opacity 0.45s ease ${i * 0.06}s, transform 0.45s ease ${i * 0.06}s`,
                }}>
                <p style={{
                  fontSize: 14, color: hov ? C.text1 : C.text2,
                  margin: 0, lineHeight: '22px', flex: 1,
                  transition: 'color 0.15s',
                }}>
                  {art.title}
                </p>
                {art.thumb && (
                  <div style={{
                    width: 44, height: 44, borderRadius: 7,
                    overflow: 'hidden', flexShrink: 0,
                  }}>
                    <Image src={art.thumb} alt="" width={44} height={44}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   VIDEOS — 2-col grid with hover scale
═══════════════════════════════════════════════════ */
const vids = [
  {
    title: 'يعمل لمدة ٣ ساعات بدخل 80 الف ريال',
    channel: 'محمد رشاد الحكيم',
    tag: 'مختلف',
    img: '/images/portfolio-hamad.png',
  },
  {
    title: 'بودكاست بالي مع محمد الحكيم',
    channel: 'محمد الحكيم',
    tag: '',
    img: '/images/portfolio-treehaus.png',
  },
];

function Videos() {
  return (
    <section style={{ background: C.bg, paddingBottom: 64 }}>
      <div style={wrap()}>
        <SectionHead title="محتوى ومُقابلات" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {vids.map((v, i) => {
            const [hov, setHov] = useState(false);
            return (
              <a key={i} href="#" target="_blank" rel="noopener noreferrer"
                onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                style={{
                  display: 'block', borderRadius: 10, overflow: 'hidden',
                  textDecoration: 'none',
                  transform: hov ? 'scale(1.015)' : 'scale(1)',
                  transition: 'transform 0.22s ease',
                }}>
                <div style={{ position: 'relative', paddingBottom: '60%', background: C.surface }}>
                  <Image src={v.img} alt={v.title} fill style={{ objectFit: 'cover' }} />
                  {/* Gradient */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 52%)',
                  }} />
                  {/* Play button */}
                  <div style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 42, height: 42, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.5)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: '#fff', fontSize: 15 }}>▶</span>
                  </div>
                  {/* Tag badge */}
                  {v.tag && (
                    <div style={{
                      position: 'absolute', top: 10, right: 10,
                      background: C.orange, borderRadius: 4, padding: '2px 7px',
                      fontSize: 10, color: '#fff', fontWeight: 500,
                    }}>{v.tag}</div>
                  )}
                  {/* Title overlay */}
                  <div style={{ position: 'absolute', bottom: 10, right: 12, left: 12 }}>
                    <p style={{ fontSize: 13, color: '#fff', margin: '0 0 2px', fontWeight: 400 }}>{v.title}</p>
                    <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{v.channel}</p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CTA SECTION
   — confirmed: paddingTop 80px, paddingBottom 48px
═══════════════════════════════════════════════════ */
function CTA() {
  return (
    <section style={{ background: C.bg, paddingTop: 16, paddingBottom: 64 }}>
      <div style={wrap()}>
        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 14,
          padding: '44px 48px',
          maxWidth: 680,
        }}>
          <h2 style={{
            fontSize: 20, fontWeight: 400, color: C.text1,
            margin: '0 0 12px',
          }}>
            تبحث عن خدماتي؟
          </h2>
          <p style={{
            fontSize: 15, color: C.text3, lineHeight: '28px',
            margin: '0 0 28px', maxWidth: 500,
          }}>
            ومستعد أن تستثمر فيه وتعمل مع الأفضل؟ فرق شاسع ما بين بناء المشروع الاستشاري والتعامل معه كهواية. المشروع يتطلّب رؤية، تركيز وخطّة واضحة في التسويق والمُنتجات.
          </p>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' as const }}>
            {/* Primary button */}
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: C.text1, color: C.bg,
              borderRadius: 8, padding: '9px 17px',
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}>
              <Dots size={9} />
              <span>الخدمات والباقات</span>
            </a>
            <GhostBtn>تواصل معي</GhostBtn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PODCAST SECTION
   — confirmed: paddingTop 80px, paddingBottom 48px
═══════════════════════════════════════════════════ */
function Podcast() {
  return (
    <section style={{ background: C.bg, paddingTop: 16, paddingBottom: 64 }}>
      <div style={wrap()}>
        <SectionHead
          title="تعلّم بيع الخبرات"
          action={<GhostBtn small>جميع الحلقات</GhostBtn>}
        />

        <div style={{
          background: C.surface,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: '18px 22px',
          display: 'flex', alignItems: 'center', gap: 18,
          maxWidth: 500,
        }}>
          <div style={{
            width: 56, height: 56, borderRadius: 9,
            overflow: 'hidden', flexShrink: 0,
          }}>
            <Image src="/images/avatar.png" alt="بودكاست حكيم" width={56} height={56}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 16, fontWeight: 400, color: C.text1, margin: '0 0 3px' }}>
              بودكاست حكيم
            </p>
            <p style={{ fontSize: 12, color: C.text3, margin: '0 0 10px', lineHeight: '18px' }}>
              محمّد الحكيم · ابني مشروعك الاستشاري وبيع الخبرة بدل الخدمة
            </p>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { l: 'YouTube', c: '#ff0000' },
                { l: 'Spotify', c: '#1db954' },
                { l: 'Apple',   c: '#9b59b6' },
              ].map(({ l, c }) => (
                <a key={l} href="#" style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: `${c}18`,
                  border: `1px solid ${c}30`,
                  borderRadius: 5, padding: '3px 9px',
                  fontSize: 11, color: c, textDecoration: 'none',
                }}>{l}</a>
              ))}
            </div>
          </div>
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
          <p style={{
            fontSize: 16, fontWeight: 400, color: C.text1,
            margin: '0 0 16px', lineHeight: '26px',
          }}>
            أحدث مقالاتي مباشرة في بريدك الالكتروني
          </p>
          <div style={{
            display: 'flex', borderRadius: 8, overflow: 'hidden',
            border: `1px solid ${C.border}`,
          }}>
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
                  onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                  style={{
                    fontSize: 13,
                    color: hov ? C.text2 : C.text3,
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
export default function Page() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <Stats />
        <ClientsTicker />
        <Nashra />
        <Products />
        <ServicesTicker />
        <Articles />
        <Videos />
        <CTA />
        <Podcast />
        <Footer />
      </main>
    </div>
  );
}
