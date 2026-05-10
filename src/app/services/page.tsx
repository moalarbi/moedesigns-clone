'use client';
import { useState, useEffect, CSSProperties } from 'react';
import Image from 'next/image';

/* ═══════════════════════════════════════════════════
   DESIGN TOKENS
═══════════════════════════════════════════════════ */
const C = {
  bg:          '#0f0f0f',
  surface:     '#171717',
  surface2:    '#1e1e1e',
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

/* Check icon (orange) */
function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="7" cy="7" r="6.5" stroke={C.orange} strokeWidth="1" />
      <path d="M4.5 7l2 2 3-3.5" stroke={C.orange} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
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
            { label: 'المنتجات', href: '/products' },
            { label: 'الخدمات',  href: '/services', active: true },
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
   HERO
═══════════════════════════════════════════════════ */
function Hero() {
  const [hov, setHov] = useState(false);
  return (
    <section style={{ paddingTop: 80 + 64, paddingBottom: 40 }}>
      <div style={wrap()}>
        <h1 style={{
          fontSize: 28, fontWeight: 500, color: C.text1,
          lineHeight: '36px', letterSpacing: '-0.84px',
          margin: '0 0 12px',
        }}>
          الباقات
        </h1>
        <p style={{
          fontSize: 16, fontWeight: 400, color: C.text2,
          margin: '0 0 24px', lineHeight: '27.2px',
          maxWidth: 580,
        }}>
          لا يوجد استثمار في حياتك أهم من نفسك. كُل مشاريعك المستقبليّة في بيع الخبرات تعتمد على براندك الشخصي والذي هو ناتج تخصّصك
        </p>
        <a href="#"
          onMouseEnter={() => setHov(true)}
          onMouseLeave={() => setHov(false)}
          style={{
            display: 'inline-flex', alignItems: 'center',
            padding: '8px 14px',
            borderRadius: 10,
            background: hov ? '#d5d5d5' : C.text1,
            color: C.bg,
            fontSize: 14, fontWeight: 500,
            textDecoration: 'none',
            transition: 'background 0.18s ease',
          }}>
          تواصل
        </a>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICE CARDS
═══════════════════════════════════════════════════ */

/* Strategy Package Card — large left card */
function StrategyCard() {
  const [hov, setHov] = useState(false);
  const features = [
    'استراتيجيّة البراند الشخصي',
    'الموقع الإلكتروني الاحترافي',
    'الهويّة البصريّة والمحتوى',
    'الحضور الرقمي المتكامل',
  ];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.surface,
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        transition: 'border-color 0.2s ease',
        direction: 'rtl',
        boxSizing: 'border-box',
        width: '100%',
      }}>
      {/* Price */}
      <p style={{ fontSize: 10, fontWeight: 400, color: C.text2, margin: '0 0 6px' }}>يبدأ من $8,000</p>
      {/* Title */}
      <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text1, margin: '0 0 10px', lineHeight: '28px' }}>
        باقة الاستراتيجيّة
      </h3>
      {/* Description */}
      <p style={{ fontSize: 14, fontWeight: 400, color: C.text2, margin: '0 0 18px', lineHeight: '23px' }}>
        بناء براندك الشخصي من الصفر — من الاستراتيجيّة والهويّة البصريّة إلى الموقع الاحترافي والمحتوى.
      </p>
      {/* Divider */}
      <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 16 }} />
      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 18 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <CheckIcon />
            <span style={{ fontSize: 13, color: C.text1, lineHeight: '20px' }}>{f}</span>
          </div>
        ))}
      </div>
      {/* Divider */}
      <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 14 }} />
      {/* Addon */}
      <p style={{ fontSize: 12, fontWeight: 400, color: C.text3, margin: 0, lineHeight: '18px' }}>
        <span style={{ color: C.text2 }}>$3,000</span> — تدريب شخصي لشهرين
      </p>
    </div>
  );
}

/* Full Package Card — large right card */
function FullPackageCard() {
  const [hov, setHov] = useState(false);
  const features = [
    'كل ما في باقة الاستراتيجيّة',
    'إنتاج محتوى شهري احترافي',
    'إدارة الحضور الرقمي',
    'استشارات مستمرة لـ 6 أشهر',
  ];
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.surface,
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        transition: 'border-color 0.2s ease',
        direction: 'rtl',
        boxSizing: 'border-box',
        width: '100%',
      }}>
      {/* Price */}
      <p style={{ fontSize: 10, fontWeight: 400, color: C.text2, margin: '0 0 6px' }}>يبدأ من $15,000</p>
      {/* Title */}
      <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text1, margin: '0 0 10px', lineHeight: '28px' }}>
        بناء شركة من فرد واحد
      </h3>
      {/* Description */}
      <p style={{ fontSize: 14, fontWeight: 400, color: C.text2, margin: '0 0 18px', lineHeight: '23px' }}>
        الباقة الشاملة لبناء مشروعك الاستشاري كاملاً — الهويّة والموقع والمحتوى والتسويق والمبيعات.
      </p>
      {/* Divider */}
      <div style={{ borderTop: `1px solid ${C.border}`, marginBottom: 16 }} />
      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <CheckIcon />
            <span style={{ fontSize: 13, color: C.text1, lineHeight: '20px' }}>{f}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Marketing Card — left */
function MarketingCard() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.surface,
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        transition: 'border-color 0.2s ease',
        direction: 'rtl',
        boxSizing: 'border-box',
        width: '100%',
      }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text1, margin: 0, lineHeight: '28px' }}>
          التسويق
        </h3>
        {/* Badge */}
        <span style={{
          fontSize: 11, fontWeight: 500, color: C.orange,
          border: `1px solid ${C.orange}`,
          borderRadius: 20, padding: '3px 10px',
          whiteSpace: 'nowrap' as const,
        }}>
          الأماكن محدودة
        </span>
      </div>
      <p style={{ fontSize: 10, fontWeight: 400, color: C.text2, margin: '0 0 10px' }}>$2,000++ /شهرياً</p>
      <p style={{ fontSize: 14, fontWeight: 400, color: C.text2, margin: 0, lineHeight: '23px' }}>
        إدارة احترافيّة لحضورك الرقمي وإنتاج المحتوى شهرياً — مخصّص لأصحاب البرند الشخصي المؤسَّس.
      </p>
    </div>
  );
}

/* Separate Service Card — right */
function SeparateServiceCard() {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.surface,
        borderRadius: 16,
        padding: 20,
        border: `1px solid ${hov ? C.borderHover : C.border}`,
        transition: 'border-color 0.2s ease',
        direction: 'rtl',
        boxSizing: 'border-box',
        width: '100%',
      }}>
      <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text1, margin: '0 0 8px', lineHeight: '28px' }}>
        محتاج خدمة منفصلة؟
      </h3>
      <p style={{ fontSize: 14, fontWeight: 400, color: C.text2, margin: '0 0 16px', lineHeight: '23px' }}>
        تصميم موقع، هويّة بصريّة، أو كتابة إعلانيّة — تواصل وسنحدد ما يناسبك.
      </p>
      <a href="#" style={{
        display: 'inline-flex', alignItems: 'center',
        fontSize: 13, color: C.text2, textDecoration: 'none',
        border: `1px solid ${C.border}`, borderRadius: 8,
        padding: '7px 13px',
        transition: 'all 0.18s ease',
      }}>
        تواصل معنا
      </a>
    </div>
  );
}

/* FAQ Item */
function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      borderBottom: `1px solid ${C.border}`,
      paddingBottom: 14,
      marginBottom: 14,
    }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, direction: 'rtl',
        }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: C.text1, textAlign: 'right' as const }}>{q}</span>
        <span style={{
          fontSize: 18, color: C.text3, marginRight: 12, flexShrink: 0,
          transition: 'transform 0.2s', transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          display: 'inline-block',
        }}>+</span>
      </button>
      {open && (
        <p style={{ fontSize: 13, color: C.text2, margin: '10px 0 0', lineHeight: '21px', textAlign: 'right' as const }}>
          {a}
        </p>
      )}
    </div>
  );
}

/* Coaching / FAQ Card — full width */
function CoachingCard() {
  const faqs = [
    {
      q: 'هل الاستثمار معكم إيجابي؟',
      a: 'نعم، نعمل فقط مع أشخاص نؤمن بإمكانية نجاحهم. إذا لم تكن مستعداً، سنخبرك بصراحة.',
    },
    {
      q: 'هل أحتاج باقة الاستراتيجيّة أو الباقة الشاملة؟',
      a: 'إذا كنت تبدأ من الصفر، ابدأ بباقة الاستراتيجيّة. إذا أردت الاستمرار والنمو، الباقة الشاملة هي الأنسب.',
    },
    {
      q: 'كيف نضمن نجاح التعاون معك؟',
      a: 'من خلال نموذج عمل مثبت وفريق متخصص ومتابعة مستمرة على مدار فترة التعاون.',
    },
  ];
  return (
    <div style={{
      background: C.surface,
      borderRadius: 16,
      padding: 24,
      border: `1px solid ${C.border}`,
      direction: 'rtl',
      boxSizing: 'border-box',
      width: '100%',
    }}>
      <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text1, margin: '0 0 6px' }}>
        توجيه شخصي؟ احجز موعدك
      </h3>
      <p style={{ fontSize: 14, color: C.text2, margin: '0 0 20px', lineHeight: '23px' }}>
        جلسة استشاريّة لمدة ساعة نحدد فيها وضعك الحالي وخارطة الطريق المناسبة لك.
      </p>
      <div>
        {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
      </div>
    </div>
  );
}

/* Ads Banner — full width */
function AdsBanner() {
  const [hov, setHov] = useState(false);
  return (
    <div style={{
      background: C.surface,
      borderRadius: 16,
      padding: '24px 28px',
      border: `1px solid ${C.border}`,
      direction: 'rtl',
      boxSizing: 'border-box',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 16,
    }}>
      <div>
        <h3 style={{ fontSize: 18, fontWeight: 500, color: C.text1, margin: '0 0 6px' }}>
          حابب تعلن على منصّاتي؟ قوّي براندك
        </h3>
        <p style={{ fontSize: 14, color: C.text2, margin: 0, lineHeight: '23px' }}>
          استمارة التواصل &nbsp;·&nbsp; أسعار الإعلانات
        </p>
      </div>
      <a href="#"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'inline-flex', alignItems: 'center',
          padding: '8px 16px',
          borderRadius: 10,
          background: hov ? '#d5d5d5' : C.text1,
          color: C.bg,
          fontSize: 13, fontWeight: 500,
          textDecoration: 'none',
          transition: 'background 0.18s ease',
          flexShrink: 0,
          whiteSpace: 'nowrap' as const,
        }}>
        تواصل
      </a>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SERVICES GRID
═══════════════════════════════════════════════════ */
function ServicesGrid() {
  return (
    <section style={{ paddingBottom: 80 }}>
      <div style={wrap()}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          direction: 'ltr',
        }}>
          {/* Row 1: Strategy (left) + Full Package (right) */}
          <StrategyCard />
          <FullPackageCard />

          {/* Row 2: Marketing (left) + Separate Service (right) */}
          <MarketingCard />
          <SeparateServiceCard />

          {/* Row 3: Coaching / FAQ — full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <CoachingCard />
          </div>

          {/* Row 4: Ads banner — full width */}
          <div style={{ gridColumn: '1 / -1' }}>
            <AdsBanner />
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
export default function ServicesPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <NavbarInner />
      <main>
        <Hero />
        <ServicesGrid />
        <Footer />
      </main>
    </div>
  );
}
