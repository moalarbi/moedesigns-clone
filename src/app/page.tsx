'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

/* ─── DESIGN TOKENS ─────────────────────────────── */
const T = {
  bg: '#0f0f0f',
  card: '#171717',
  card2: '#212121',
  text1: '#ededed',
  text2: '#d9d9d9',
  text3: '#c1c1c1',
  muted: '#888',
  border: 'rgba(255,255,255,0.08)',
  green: '#00c763',
  blue: '#2151ff',
  orange: '#ff7b0f',
  orangeDim: '#2e1e16',
};

/* ─── DATA ──────────────────────────────────────── */
const portfolioItems = [
  { name: 'Luniva', type: 'موقع تجاري', img: '/images/portfolio-luniva.png', bg: '#c4956a' },
  { name: 'شارك - Coworking', type: 'موقع تجاري', img: '/images/portfolio-sharak.png', bg: '#2a2a2a' },
  { name: 'منيرة | الاحتراق الوظيفي', type: 'منصّة تدريبيّة', img: '/images/portfolio-muneera.png', bg: '#1a1a2e' },
  { name: 'ثرى للعقار', type: 'موقع تجاري', img: '/images/portfolio-thra.png', bg: '#1e2a1e' },
  { name: 'حمد راشد الشامسي', type: 'موقع شخصي', img: '/images/portfolio-hamad.png', bg: '#1a1a1a' },
  { name: 'CX Hub Saudi', type: 'موقع تجاري', img: '/images/portfolio-cxhub.png', bg: '#0d1117' },
];

const clientLogos = [
  'wfrah', 'McKinsey & Company', 'Mindvalley', 'رصف', 'Klive', 'فنك',
  'MIDDLE CAIRO ASSOCIATION', 'Mastercard', 'Google', 'Amazon',
];

const products = [
  { type: 'دورة مسجّلة', title: 'المنهجيّة "العلميّة" في الكتابة الإعلانيّة', price: '$249', img: '/images/portfolio-thra.png' },
  { type: 'دورة رقميّة مسجّلة', title: 'دورة تصميم وبناء المواقع', price: '$199', img: '/images/portfolio-luniva.png' },
  { type: 'كتيّب رقمي تفاعلي', title: 'كتيّب استراتيجيّة البراند الشخصي', price: '$69', img: '/images/portfolio-sharak.png' },
  { type: 'دورة مسجّلة', title: 'أساسيات بناء وتسويق الدورات الرقمية', price: '$199', img: '/images/portfolio-muneera.png' },
  { type: 'ورشة مسجّلة', title: 'ورشة بناء مشروع استشاري من الصفر', price: '$149', img: '/images/portfolio-cxhub.png' },
];

const servicesPills = [
  'البيع والتسعير', 'السوشال ميديا والإعلام', 'التسويق والتوسّع',
  'الاستراتيجيّة والتمركز', 'بناء المشروع والمنتجات',
];

const articles = [
  { title: '٤ قِيَم. كُل أصحاب البراندات الناجحة كانت عندهم', hasThumb: true, img: '/images/portfolio-hamad.png' },
  { title: 'منهجيّتي لبيع الخدمات الأغلى | Hight ticket', hasThumb: false },
  { title: 'تقرير: هل ما زال بيع الدورات مشروع مُربح؟', hasThumb: true, img: '/images/portfolio-thra.png' },
  { title: '٣ أسئلة قبل أن أبدأ بأي مشروع', hasThumb: false },
  { title: 'درست حَملات أفضل من يبيعون المنتجات الرقميّة. اتّضح أن لديهم سر..', hasThumb: true, img: '/images/portfolio-luniva.png' },
  { title: 'التخصّص يحميك من تحيّزاتك الفكريّة', hasThumb: false },
  { title: 'لماذا أفضّل التخصّص في المُشكلة وليس في التكنيك (الحِرفة)؟', hasThumb: false },
  { title: '٤ تخصّصات استشاريّة ستحقق الملايين بحلول ٢٠٢٨', hasThumb: true, img: '/images/portfolio-muneera.png' },
];

/* ─── HELPERS ───────────────────────────────────── */
function Dot({ color = '#00c763' }: { color?: string }) {
  return (
    <span style={{
      display: 'inline-block', width: 7, height: 7,
      borderRadius: '50%', background: color, flexShrink: 0,
    }} />
  );
}

function DotsMenu() {
  return (
    <span style={{ fontSize: 14, letterSpacing: 3, color: T.muted, lineHeight: 1 }}>···</span>
  );
}

function SectionHeading({ children, leftBtn }: { children: string; leftBtn?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
      {leftBtn || <span />}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <h2 style={{ fontSize: 18, fontWeight: 500, color: T.text1, margin: 0 }}>{children}</h2>
        <span style={{ fontSize: 18, color: T.text1 }}>←</span>
      </div>
    </div>
  );
}

/* ─── NAVBAR ────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, right: 0, left: 0, zIndex: 100,
      height: 68,
      background: scrolled ? 'rgba(15,15,15,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition: 'background 0.3s ease, backdrop-filter 0.3s ease',
    }}>
      <div style={{
        maxWidth: 1128, margin: '0 auto', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 24px',
      }}>
        {/* RIGHT side (RTL): avatar + nav links + dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, background: T.card }}>
            <Image src="/images/avatar.png" alt="محمّد الحكيم" width={32} height={32}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {['المنتجات', 'الخدمات', 'الأعمال', 'المقالات'].map(link => (
            <a key={link} href="#" style={{ fontSize: 16, color: T.text2, textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = T.text1)}
              onMouseLeave={e => (e.currentTarget.style.color = T.text2)}>
              {link}
            </a>
          ))}
          <DotsMenu />
        </div>

        {/* LEFT side (RTL): dots + CTA button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <DotsMenu />
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 14px 8px 12px',
            border: '1.5px solid rgba(255,255,255,0.13)',
            borderRadius: 10,
            fontSize: 13, fontWeight: 500, color: T.text1,
            textDecoration: 'none',
            background: 'rgba(255,255,255,0.04)',
            transition: 'background 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}>
            <DotsMenu />
            <span>ابدأ باستشارة</span>
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── HERO ──────────────────────────────────────── */
const heroCards = [
  { label: 'ابدأ معي', value: 'احجز استشارة', dot: true, dotColor: '#00c763' },
  { label: 'المقالات', value: '١٥٠ مقال في بيع الخبرات', dot: false },
  { label: 'اعمل معي', value: 'خدماتي والباقات', dot: false },
];

function HeroSection() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      background: T.bg, paddingTop: 68,
    }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', width: '100%', padding: '0 24px' }}>
        {/* H1 — right-aligned in RTL */}
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: 32, paddingTop: 60 }}>
          <h1 style={{
            fontSize: 28,
            fontWeight: 500,
            lineHeight: '36px',
            letterSpacing: '-0.84px',
            color: T.text2,
            maxWidth: 380,
            margin: 0,
          }}>
            مستشار في بناء المشاريع الاستشاريّة والتدريبيّة. رائد أعمال وكاتب.
          </h1>
        </div>

        {/* Hero cards */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {heroCards.map((card, i) => (
            <a key={i} href="#" style={{
              display: 'flex', flexDirection: 'column', gap: 2,
              background: T.card, borderRadius: 12,
              padding: '12px 16px',
              width: 200, minHeight: 74,
              textDecoration: 'none',
              transition: 'background 0.2s',
              flexShrink: 0,
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1e1e1e'; }}
              onMouseLeave={e => { e.currentTarget.style.background = T.card; }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 13, color: T.text2 }}>{card.label}</span>
                {card.dot
                  ? <Dot color={card.dotColor} />
                  : <span style={{ fontSize: 12, letterSpacing: 3, color: T.muted }}>···</span>}
              </div>
              <span style={{ fontSize: 16, color: T.text2 }}>{card.value}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO ─────────────────────────────────── */
function PortfolioSection() {
  const [idx, setIdx] = useState(0);
  const visible = 2;
  const cardW = 333;
  const gap = 16;
  const max = portfolioItems.length - visible;

  return (
    <section style={{ background: T.bg, padding: '0 0 60px' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading>أحدث أعمالي</SectionHeading>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'flex', gap,
            transform: `translateX(${idx * (cardW + gap)}px)`,
            transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {portfolioItems.map((item, i) => (
              <div key={i} style={{ flexShrink: 0, width: cardW }}>
                <div style={{
                  borderRadius: 10, overflow: 'hidden',
                  background: item.bg,
                  padding: 12, height: 222,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  {/* Browser chrome dots */}
                  <div style={{
                    position: 'absolute', top: 10, right: 10,
                    display: 'flex', gap: 4,
                  }}>
                    {[0,1,2].map(d => (
                      <span key={d} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.25)' }} />
                    ))}
                  </div>
                  <Image src={item.img} alt={item.name} width={309} height={190}
                    style={{ width: '100%', height: '90%', objectFit: 'cover', borderRadius: 4 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, paddingRight: 2, paddingLeft: 2 }}>
                  <span style={{ fontSize: 10, color: T.text2 }}>{item.type}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 500, color: T.text1 }}>{item.name}</span>
                    <DotsMenu />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
          {[{ arrow: '‹', dir: 1 }, { arrow: '›', dir: -1 }].map(({ arrow, dir }, ai) => (
            <button key={ai}
              onClick={() => setIdx(prev => Math.max(0, Math.min(max, prev + dir)))}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'transparent', border: `1px solid ${T.border}`,
                color: T.text2, fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = T.card; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}>
              {arrow}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── STATS ─────────────────────────────────────── */
function StatPill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      background: 'rgba(255,255,255,0.06)',
      border: `1px solid rgba(255,255,255,0.12)`,
      borderRadius: 6, padding: '1px 10px',
      fontSize: 18, fontWeight: 500, color: T.text1,
      whiteSpace: 'nowrap',
    }}>
      {children}
    </span>
  );
}

function StatsSection() {
  return (
    <section style={{ background: T.bg, padding: '0 0 60px' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: T.card, borderRadius: 16,
          padding: 40, maxWidth: 800,
        }}>
          <p style={{
            fontSize: 18, color: T.text3, lineHeight: '32px', margin: '0 0 20px',
            display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center',
          }}>
            <span>خلال</span>
            <StatPill>٧ سنوات</StatPill>
            <span>ساعدت</span>
            <StatPill>80+</StatPill>
            <span>مؤسّس ليبدأ مشروعه في بيع الخبرات. عُملائي يشهدون بعائد استثمار يبدأ من</span>
            <StatPill>400%</StatPill>
            <span>خلال السنة الأولى</span>
          </p>
          <p style={{ fontSize: 16, color: T.text3, lineHeight: '28px', margin: 0 }}>
            تشمل{' '}
            <a href="#" style={{ color: T.text1, textDecoration: 'none', borderBottom: `1px solid ${T.border}` }}>
              خدماتي
            </a>
            {' '}باقات في تأسيس المشروع أو المُساعدة في توسعته. عموماً أساعدك أن تنتقل في بيع الخبرات من هواية ومُقايضة الوقت بالمال إلى شركة من فرد واحد
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─── CLIENTS TICKER ────────────────────────────── */
function ClientsTicker() {
  const logos = [...clientLogos, ...clientLogos];
  return (
    <section style={{ background: T.bg, padding: '20px 0 60px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="scroll-ticker" style={{
          display: 'flex', gap: 48, flexShrink: 0,
          alignItems: 'center', whiteSpace: 'nowrap',
        }}>
          {logos.map((logo, i) => (
            <span key={i} style={{
              fontSize: 15, fontWeight: 500,
              color: 'rgba(255,255,255,0.22)',
              flexShrink: 0, letterSpacing: 0.3,
            }}>{logo}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── NASHRA SECTION ────────────────────────────── */
function NashraSection() {
  return (
    <section style={{ background: T.bg, padding: '0 0 60px' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: T.card, borderRadius: 16,
          overflow: 'hidden',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          minHeight: 340,
        }}>
          {/* Right col: content (RTL first) */}
          <div style={{ padding: '40px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: T.orangeDim, borderRadius: 8, padding: '4px 10px',
              alignSelf: 'flex-start',
            }}>
              <span style={{ fontSize: 12, color: T.orange }}>↓ Nashra.ai</span>
            </div>

            <div>
              <h3 style={{ fontSize: 22, fontWeight: 500, color: T.text1, margin: '0 0 6px' }}>
                نشرتك البريديّة + مدوّنتك
              </h3>
              <h4 style={{ fontSize: 22, fontWeight: 500, color: T.text2, margin: 0 }}>
                تواصل مع متابعينك مباشرة
              </h4>
            </div>

            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: T.card2, borderRadius: 10,
              padding: '10px 16px',
              fontSize: 13, fontWeight: 500, color: T.text1,
              textDecoration: 'none',
              border: `1px solid ${T.border}`,
              alignSelf: 'flex-start',
              transition: 'background 0.2s',
            }}>
              <DotsMenu />
              <span>الاشتراك والتفاصيل</span>
            </a>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {['تدعم الكتابة بالعربي', 'صفحات هبوط', 'تصميم محمّد الحكيم'].map((feat, i) => (
                <div key={i} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${T.border}`,
                  borderRadius: 8, padding: '6px 12px',
                  alignSelf: 'flex-start',
                }}>
                  <Dot color={T.text3} />
                  <span style={{ fontSize: 13, color: T.text2 }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Left col: newsletter mockup */}
          <div style={{
            background: '#0d0d0d',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
            borderRight: `1px solid ${T.border}`,
          }}>
            <div style={{
              background: '#111', borderRadius: 12, padding: 20,
              width: '100%', maxWidth: 280,
              border: '1px solid rgba(255,255,255,0.1)',
            }}>
              <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
                {[T.orangeDim, T.card2, T.card2].map((c, i) => (
                  <div key={i} style={{ height: 8, flex: i === 0 ? 1 : 2, background: c, borderRadius: 4 }} />
                ))}
              </div>
              <div style={{ background: '#1a1a2e', borderRadius: 8, padding: 12, marginBottom: 10 }}>
                <div style={{ height: 6, background: '#2e3a6e', borderRadius: 3, width: '70%', marginBottom: 6 }} />
                <div style={{ height: 6, background: '#2e3a6e', borderRadius: 3, width: '40%' }} />
              </div>
              <div style={{
                background: '#1a1a1a', borderRadius: 6, padding: '8px 10px',
                fontSize: 11, color: T.muted, marginBottom: 8,
              }}>Email Address</div>
              <div style={{
                background: T.blue, borderRadius: 6, padding: '8px 10px',
                fontSize: 11, color: '#fff', textAlign: 'center' as const, fontWeight: 500,
              }}>Join Us →</div>
              <p style={{ fontSize: 10, color: T.muted, textAlign: 'center' as const, margin: '8px 0 0' }}>
                Powered by Nashra
              </p>
              <div style={{ display: 'flex', gap: 4, justifyContent: 'center', marginTop: 12 }}>
                {[T.orange, T.muted, T.muted].map((c, i) => (
                  <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: c }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PRODUCTS ──────────────────────────────────── */
function ProductsSection() {
  const [idx, setIdx] = useState(0);
  const cardW = 234;
  const gap = 12;
  const visible = 3;
  const max = products.length - visible;

  return (
    <section style={{ background: T.bg, padding: '60px 0' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading>أحدث المنتجات</SectionHeading>
        <div style={{ overflow: 'hidden' }}>
          <div style={{
            display: 'flex', gap,
            transform: `translateX(${idx * (cardW + gap)}px)`,
            transition: 'transform 0.45s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {products.map((p, i) => (
              <div key={i} style={{ flexShrink: 0, width: cardW }}>
                <a href="#" style={{
                  display: 'block',
                  background: T.card, borderRadius: 10,
                  overflow: 'hidden',
                  border: `1px solid ${T.border}`,
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = T.border)}>
                  <div style={{ height: 140, overflow: 'hidden', position: 'relative' }}>
                    <Image src={p.img} alt={p.title} width={234} height={140}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '10px 12px 14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 10, color: T.orange, fontWeight: 500 }}>{p.price}</span>
                      <span style={{ fontSize: 12, fontWeight: 500, color: T.muted }}>{p.type}</span>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 500, color: T.text1, margin: 0, lineHeight: '20px' }}>{p.title}</p>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 20, justifyContent: 'flex-end' }}>
          {[{ arrow: '‹', dir: 1 }, { arrow: '›', dir: -1 }].map(({ arrow, dir }, ai) => (
            <button key={ai}
              onClick={() => setIdx(prev => Math.max(0, Math.min(max, prev + dir)))}
              style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'transparent', border: `1px solid ${T.border}`,
                color: T.text2, fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
              {arrow}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SERVICES PILLS TICKER ─────────────────────── */
function ServicesPillsTicker() {
  const pills = [...servicesPills, ...servicesPills, ...servicesPills];
  return (
    <section style={{ background: T.bg, padding: '0 0 60px', overflow: 'hidden' }}>
      <div style={{ display: 'flex', overflow: 'hidden' }}>
        <div className="scroll-ticker" style={{
          display: 'flex', gap: 8, flexShrink: 0,
          alignItems: 'center',
        }}>
          {pills.map((pill, i) => (
            <span key={i} style={{
              flexShrink: 0,
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: T.orangeDim, borderRadius: 6,
              padding: '4px 10px',
              fontSize: 15, color: T.orange,
              whiteSpace: 'nowrap' as const,
            }}>
              <DotsMenu />
              {pill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── ARTICLES ──────────────────────────────────── */
function ArticlesSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.05 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: T.bg, padding: '60px 0' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading>آخر المقالات</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          {articles.map((art, i) => (
            <a key={i} href="#" style={{
              display: 'flex', alignItems: 'center',
              justifyContent: 'space-between', gap: 12,
              padding: '16px 0',
              borderBottom: `1px solid ${T.border}`,
              ...(i % 2 === 0
                ? { borderLeft: `1px solid ${T.border}`, paddingRight: 16 }
                : { paddingLeft: 16 }),
              textDecoration: 'none',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(14px)',
              transition: `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`,
            }}>
              <p style={{ fontSize: 14, color: T.text2, margin: 0, lineHeight: '22px', flex: 1 }}>{art.title}</p>
              {art.hasThumb && art.img && (
                <div style={{ width: 48, height: 48, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                  <Image src={art.img} alt="" width={48} height={48}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              )}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── VIDEO SECTION ─────────────────────────────── */
const videos = [
  { title: 'يعمل لمدة ٣ ساعات بدخل 80 الف ريال', channel: 'محمد رشاد الحكيم', tag: 'مختلف', img: '/images/portfolio-hamad.png' },
  { title: 'بودكاست بالي مع محمد الحكيم', channel: 'محمد الحكيم', tag: '', img: '/images/portfolio-treehaus.png' },
];

function VideoSection() {
  return (
    <section style={{ background: T.bg, padding: '60px 0' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading>محتوى ومُقابلات</SectionHeading>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {videos.map((v, i) => (
            <a key={i} href="#" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', borderRadius: 12, overflow: 'hidden', textDecoration: 'none', position: 'relative' as const }}>
              <div style={{ position: 'relative' as const, paddingBottom: '62%', background: T.card }}>
                <Image src={v.img} alt={v.title} fill style={{ objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute' as const, inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)',
                }} />
                {/* Play btn */}
                <div style={{
                  position: 'absolute' as const, top: '50%', left: '50%',
                  transform: 'translate(-50%,-50%)',
                  width: 50, height: 50, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.65)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: '#fff', fontSize: 20 }}>▶</span>
                </div>
                {v.tag && (
                  <div style={{
                    position: 'absolute' as const, top: 12, right: 12,
                    background: T.orange, borderRadius: 6,
                    padding: '2px 8px', fontSize: 11, color: '#fff', fontWeight: 500,
                  }}>{v.tag}</div>
                )}
                <div style={{ position: 'absolute' as const, bottom: 12, right: 12, left: 12 }}>
                  <p style={{ fontSize: 13, color: '#fff', margin: '0 0 2px', fontWeight: 500 }}>{v.title}</p>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{v.channel}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CTA SECTION ───────────────────────────────── */
function CTASection() {
  return (
    <section style={{ background: T.bg, padding: '60px 0' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: T.card, borderRadius: 12, padding: 40,
          maxWidth: 800,
        }}>
          <h2 style={{ fontSize: 22, fontWeight: 500, color: T.text1, margin: '0 0 12px' }}>
            تبحث عن خدماتي؟
          </h2>
          <p style={{ fontSize: 16, color: T.text3, lineHeight: '28px', margin: '0 0 28px', maxWidth: 560 }}>
            ومستعد أن تستثمر فيه وتعمل مع الأفضل؟ فرق شاسع ما بين بناء المشروع الاستشاري والتعامل معه كهواية. المشروع يتطلّب رؤية، تركيز وخطّة واضحة في التسويق والمُنتجات. يمكنك أن تعمل مع ٥٠٠ خبير في العالم العربي لتحصل على خبرتي أو يمكنك أن تحصل عليها مباشرة بالضغط على الزر أدناه.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' as const }}>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: T.text1, color: T.bg,
              borderRadius: 10, padding: '10px 18px',
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
            }}>
              <DotsMenu />
              <span>الخدمات والباقات</span>
            </a>
            <a href="#" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'transparent', color: T.text2,
              border: `1px solid ${T.border}`, borderRadius: 10,
              padding: '10px 18px',
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
            }}>
              <DotsMenu />
              <span>تواصل معي</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── PODCAST SECTION ───────────────────────────── */
function PodcastSection() {
  return (
    <section style={{ background: T.bg, padding: '60px 0' }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading leftBtn={
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'transparent', color: T.text2,
            border: `1px solid ${T.border}`, borderRadius: 10,
            padding: '8px 14px',
            fontSize: 13, textDecoration: 'none',
          }}>
            <DotsMenu /><span>جميع الحلقات</span>
          </a>
        }>
          تعلّم بيع الخبرات
        </SectionHeading>

        {/* Podcast card */}
        <div style={{
          background: T.card, borderRadius: 12,
          padding: '20px 24px',
          display: 'flex', alignItems: 'center', gap: 16,
          maxWidth: 560,
          border: `1px solid ${T.border}`,
        }}>
          <div style={{ width: 64, height: 64, borderRadius: 10, overflow: 'hidden', flexShrink: 0 }}>
            <Image src="/images/avatar.png" alt="بودكاست حكيم" width={64} height={64}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 18, fontWeight: 500, color: T.text1, margin: '0 0 4px' }}>بودكاست حكيم</p>
            <p style={{ fontSize: 12, color: T.muted, margin: '0 0 12px' }}>محمّد الحكيم · ابني مشروعك الاستشاري وبيع الخبرة بدل الخدمة</p>
            <div style={{ display: 'flex', gap: 6 }}>
              {[
                { label: 'YouTube', color: '#ff0000' },
                { label: 'Spotify', color: '#1db954' },
                { label: 'Apple', color: '#9b59b6' },
              ].map(({ label, color }) => (
                <a key={label} href="#" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  background: `${color}22`,
                  border: `1px solid ${color}44`,
                  borderRadius: 6, padding: '3px 9px',
                  fontSize: 11, color, textDecoration: 'none',
                }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────── */
function Footer() {
  const [email, setEmail] = useState('');
  return (
    <footer style={{ background: T.bg, padding: '60px 0 40px', borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: 1128, margin: '0 auto', padding: '0 24px' }}>
        {/* Newsletter */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontSize: 18, fontWeight: 500, color: T.text1, margin: '0 0 20px', lineHeight: '28px' }}>
            أحدث مقالاتي مباشرة في بريدك الالكتروني
          </p>
          <div style={{
            display: 'flex', maxWidth: 480,
            borderRadius: 10, overflow: 'hidden',
            border: `1px solid ${T.border}`,
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="hala@moedesigns.io"
              style={{
                flex: 1, padding: '12px 16px',
                background: T.card, border: 'none', outline: 'none',
                fontSize: 14, color: T.text1,
                fontFamily: 'inherit', direction: 'rtl' as const,
              }}
            />
            <button style={{
              padding: '12px 20px',
              background: T.blue, border: 'none',
              fontSize: 14, fontWeight: 500, color: '#fff',
              cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
            }}>
              اشترك
            </button>
          </div>
        </div>

        {/* Footer links */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' as const }}>
          {[
            'Bali / Dubai', 'hala@moedesigns.io', 'نشــرة', 'احجز استشارة 💤',
          ].map((item, i, arr) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <a href="#" style={{ fontSize: 13, color: T.muted, textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = T.text2)}
                onMouseLeave={e => (e.currentTarget.style.color = T.muted)}>
                {item}
              </a>
              {i < arr.length - 1 && (
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 14 }}>·</span>
              )}
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ROOT ─────────────────────────────────── */
export default function Page() {
  return (
    <div style={{ background: T.bg, minHeight: '100vh' }}>
      <Navbar />
      <main>
        <HeroSection />
        <PortfolioSection />
        <StatsSection />
        <ClientsTicker />
        <NashraSection />
        <ProductsSection />
        <ServicesPillsTicker />
        <ArticlesSection />
        <VideoSection />
        <CTASection />
        <PodcastSection />
        <Footer />
      </main>
    </div>
  );
}
