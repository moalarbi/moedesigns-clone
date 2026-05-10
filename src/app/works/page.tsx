'use client';
import { useState, useEffect, useRef, CSSProperties } from 'react';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
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
   PORTFOLIO DATA — 39 projects
═══════════════════════════════════════════════════ */
const works = [
  /* ── First 12: images in /images/ ── */
  { title: 'Luniva',                                    category: 'موقع تجاري',        img: '/images/portfolio-luniva.png' },
  { title: 'شارك - Coworking',                          category: 'موقع تجاري',        img: '/images/portfolio-sharak.png' },
  { title: 'منيرة | الاحتراق الوظيفي',                 category: 'منصّة تدريبيّة',    img: '/images/portfolio-muneera.png' },
  { title: 'ثرى للعقار',                                category: 'موقع تجاري',        img: '/images/portfolio-thra.png' },
  { title: 'حمد راشد الشامسي',                          category: 'منصّة تدريبيّة',    img: '/images/portfolio-hamad.png' },
  { title: 'CX Hub Saudi',                              category: 'موقع تجاري',        img: '/images/portfolio-cxhub.png' },
  { title: 'Treehaus',                                  category: 'موقع تجاري',        img: '/images/portfolio-treehaus.png' },
  { title: 'elephantor',                                category: 'موقع تجاري',        img: '/images/portfolio-elephantor.png' },
  { title: 'سالي الشوا',                                category: 'منصّة تدريبيّة',    img: '/images/portfolio-sali.png' },
  { title: 'سارة الحميدان | مستشار ريادة أعمال',       category: 'منصّة تدريبيّة',    img: '/images/portfolio-sara.png' },
  { title: 'أكاديميّة حضور',                            category: 'منصّة تدريبيّة',    img: '/images/portfolio-hudoor.png' },
  { title: 'ستوديو مرام مختار',                         category: 'موقع تجاري',        img: '/images/portfolio-maram.png' },
  /* ── Items 13–39: images in /images/works/ ── */
  { title: 'د. جاسم العزاوي',                           category: 'موقع شخصي',         img: '/images/works/portfolio-jazem.png' },
  { title: 'بيبيميلونز | أكادميّة تربية عالميّة',      category: 'منصّة تدريبيّة',    img: '/images/works/portfolio-babymillons.png' },
  { title: 'د. شعاع دردوم',                             category: 'موقع شخصي',         img: '/images/works/portfolio-shua.png' },
  { title: 'إيمان اللواتي',                             category: 'موقع شخصي',         img: '/images/works/portfolio-iman.png' },
  { title: 'شغف: أكاديميّة الإنجليزيّة للأعمال',       category: 'منصّة تدريبيّة',    img: '/images/works/portfolio-shaghaf.png' },
  { title: 'لولوة الكعبي',                              category: 'منصّة تدريبيّة',    img: '/images/works/portfolio-lulwa.png' },
  { title: 'غدير الشهري',                               category: 'موقع شخصي',         img: '/images/works/portfolio-ghadir.png' },
  { title: 'عبداللّه الغامدي',                          category: 'موقع شخصي',         img: '/images/works/portfolio-abdullahg.png' },
  { title: 'dunecrest',                                  category: 'موقع تجاري',        img: '/images/works/portfolio-dunecrest.png' },
  { title: 'تقى المرهون | استشاري ومدرّب تربية',       category: 'منصّة تدريبيّة',    img: '/images/works/portfolio-taqah.png' },
  { title: 'نسوة',                                      category: 'موقع شخصي',         img: '/images/works/portfolio-niswah.png' },
  { title: 'خولة المطيوعي | مدرّب حياة',               category: 'منصّة تدريبيّة',    img: '/images/works/portfolio-khawla.png' },
  { title: 'فنك | مجتمع مسرحي',                         category: 'منصّة تدريبيّة',    img: '/images/works/portfolio-funk.png' },
  { title: 'نقطتين | استوديو استشاري',                  category: 'موقع تجاري',        img: '/images/works/portfolio-nuqtatayn.png' },
  { title: 'آلاء البيقاوي، مستشارة ريادية',            category: 'موقع شخصي',         img: '/images/works/portfolio-alaa.png' },
  { title: 'سنـدس الساعاتي',                            category: 'موقع شخصي',         img: '/images/works/portfolio-sundus.png' },
  { title: 'ديما نجّار',                                category: 'موقع شخصي',         img: '/images/works/portfolio-dima.png' },
  { title: 'وعد طبّاش | أخصائي نفسي',                  category: 'موقع شخصي',         img: '/images/works/portfolio-waad.png' },
  { title: 'بروجيكت بلـس',                              category: 'موقع تجاري',        img: '/images/works/portfolio-projectplus.png' },
  { title: 'رصف',                                       category: 'موقع تجاري',        img: '/images/works/portfolio-rasaf.png' },
  { title: 'جواهر المانع',                              category: 'موقع شخصي',         img: '/images/works/portfolio-jawahir.png' },
  { title: 'MECA',                                      category: 'موقع تجاري',        img: '/images/works/portfolio-meca.png' },
  { title: 'وفرة',                                      category: 'هويّة بصريّة',      img: '/images/works/portfolio-wafra.png' },
  { title: 'Scrubs2Esates',                             category: 'موقع تجاري',        img: '/images/works/portfolio-scrubs.png' },
  { title: 'انجي صبّاغ | مدرّبة حياة',                 category: 'موقع شخصي',         img: '/images/works/portfolio-anji.png' },
  { title: 'زينا للمكسّرات',                            category: 'موقع تجاري',        img: '/images/works/portfolio-zeina.png' },
  { title: 'د. هيا زيدان | الصحة النفسيّة للأمهات',   category: 'منصّة تدريبيّة',    img: '/images/works/portfolio-haya.png' },
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
   DROPDOWN ITEM
═══════════════════════════════════════════════════ */
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

/* ═══════════════════════════════════════════════════
   NAVBAR
═══════════════════════════════════════════════════ */
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
      position: 'fixed', top: 0, insetInline: 0, zIndex: 200,
      height: 64,
      background: scrolled ? 'rgba(15,15,15,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}` : '1px solid transparent',
      transition: 'background 0.3s, border-color 0.3s',
    }}>
      <div style={{ ...wrap(), height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="/" style={{
            flexShrink: 0, display: 'block',
            width: 32, height: 32, borderRadius: '50%', overflow: 'hidden',
            background: C.surface,
          }}>
            <Image src="/images/avatar.png" alt="avatar" width={32} height={32}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </a>
          {[
            { label: 'المنتجات', href: '/products' },
            { label: 'الخدمات',  href: '/services' },
            { label: 'الأعمال',  href: '/works', active: true },
            { label: 'المقالات', href: '/blog' },
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
          <div ref={dotsRef} style={{ position: 'relative' }}>
            <span onClick={() => setDropOpen(p => !p)}
              style={{ fontSize: 11, letterSpacing: '3px', color: dropOpen ? C.text2 : C.text3, cursor: 'pointer', userSelect: 'none' as const, lineHeight: 1 }}>
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
          <GhostBtn href="#">ابدأ باستشارة</GhostBtn>
        </div>
      </div>
    </nav>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{ paddingTop: 80 + 64, paddingBottom: 40 }}>
      <div style={wrap()}>
        <h1 style={{
          fontSize: 28, fontWeight: 500, color: C.text1,
          lineHeight: '36px', letterSpacing: '-0.84px',
          margin: '0 0 10px',
        }}>
          مشاريع وأعمال
        </h1>
        <p style={{
          fontSize: 16, fontWeight: 500, color: C.text2,
          margin: 0, lineHeight: '27.2px',
        }}>
          مواقع، منصّات تعليميّة، هويّات بصريّة. ببساطة نبني براندات في بيع الخبرات
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   PORTFOLIO CARD
═══════════════════════════════════════════════════ */
function WorkCard({ title, category, img }: typeof works[0]) {
  const [hov, setHov] = useState(false);

  return (
    <a href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        paddingBottom: 12,
        textDecoration: 'none',
        cursor: 'pointer',
      }}
    >
      {/* Image container */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3 / 2',
        borderRadius: 10,
        overflow: 'hidden',
        transform: hov ? 'scale(1.015)' : 'scale(1)',
        transition: 'transform 0.3s ease',
      }}>
        <Image
          src={img}
          alt={title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 880px) 100vw, 263px"
        />
      </div>

      {/* Label row: category badge (left) | title + dots (right) */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
        direction: 'ltr',
      }}>
        {/* Left: category badge */}
        <span style={{
          fontSize: 12,
          fontWeight: 400,
          color: C.text3,
          backgroundColor: C.surface,
          borderRadius: 6,
          padding: '6px 8px',
          whiteSpace: 'nowrap' as const,
          flexShrink: 0,
          direction: 'rtl',
        }}>
          {category}
        </span>

        {/* Right: title + dots */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          minWidth: 0,
          direction: 'rtl',
        }}>
          <span style={{
            fontSize: 12,
            fontWeight: 400,
            color: C.text1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap' as const,
          }}>
            {title}
          </span>
          <Dots size={10} />
        </div>
      </div>
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   WORKS GRID
═══════════════════════════════════════════════════ */
function WorksGrid() {
  return (
    <section style={{ paddingBottom: 80 }}>
      <div style={wrap()}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 16,
          rowGap: 32,
          direction: 'ltr',
        }}>
          {works.map((w, i) => (
            <WorkCard key={i} {...w} />
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
export default function WorksPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <NavbarInner />
      <main>
        <Hero />
        <WorksGrid />
        <Footer />
      </main>
    </div>
  );
}
