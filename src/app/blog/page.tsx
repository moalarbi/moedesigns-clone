'use client';
import { useState, useEffect, CSSProperties } from 'react';
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
   DATA
═══════════════════════════════════════════════════ */
const categories = [
  'البيع والتسعير',
  'السوشال ميديا والإعلام',
  'التسويق والتوسّع',
  'الاستراتيجيّة والتمركز',
  'بناء المشروع والمنتجات',
];

const articles = [
  'منهجيّتي لبيع الخدمات الأغلى | Hight ticket',
  '٤ قِيَم. كُل أصحاب البراندات الناجحة كانت عندهم',
  'تقرير: هل ما زال بيع الدورات مشروع مُربح؟',
  '٣ أسئلة قبل أن أبدأ بأي مشروع',
  'درست حَملات أفضل من يبيعون المنتجات الرقميّة. اتّضح أن لديهم سر..',
  'التخصّص يحميك من تحيّزاتك الفكريّة',
  'لماذا أفضّل التخصّص في المُشكلة وليس في التكنيك (الحِرفة)؟',
  '٤ تخصّصات استشاريّة ستحقق الملايين بحلول ٢٠٢٨',
  'استراتيجيّتي لليوتيوب والمحتوى في ٢٠٢٦',
  'قيمة أي مدرّب تنبع من ٤ نواحي',
  'العميل لا يشتري منافع ولا مميّزات إنّما يشتري توكيلاً للمُخاطرة',
  'هل تبني حاليّاً براند، أو مشروع إعادة توزيع؟',
  'مشروع لايف ستايل أو شركة؟ أيّهم الأفضل؟',
  'تحدّي توسّع مشروعك هو تحدي بناء الفريق',
  'المرجع لكيف تستثمر في مشروعك في بيع الخبرات',
  'أبسط صفحة هبوط لتبدأ في بيع الخدمات الاستشاريّة',
  'مكالمة البيع التي ضاعفت حجم المشروع ٣ مرّات',
  'فخ التعدّد: لماذا منتجات أكثر = إيرادات أقل',
  'للخبراء: كيف تحول معرفتك إلى مبيعات مضمونة',
  'الشفافيّة في تسعير الخدمات',
  'تجنّب المنافسة بالسعر بعمل باقاتك الخاصّة',
  'كيف تبني نظام لمحتوى السوشال ميديا في ٦ خطوات لتضاعف وصولك وبراندك الشخصي',
  'الحالة الوحيدة ليكون "أسلوبك" ميزة تنافسيّة',
  'كيف تبني مشروع أكبر منك',
  'توسّع المشروع الاستشاري: ضع أهداف مستحيلة',
  'لماذا التخطيط لا يعني الاستراتيجيّة ولا يعني النتائج',
  'ماذا تستطيع أن تبيع في عصر تشات جي بي تي؟',
  'القِيَم التي تُحدد نجاح المشروع الاستشاري',
  'كيف تتوسّع المشاريع؟ (ولماذا يعلق البقيّة؟)',
  'في المجال الإبداعي؟ هنا الطريقة لزيادة دخلك',
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
            { label: 'الخدمات',  href: '/services' },
            { label: 'الأعمال',  href: '/works' },
            { label: 'المقالات', href: '/blog', active: true },
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
   SEARCH ICON
═══════════════════════════════════════════════════ */
function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="4.5" stroke="#888" strokeWidth="1.2" />
      <path d="M9.5 9.5L12.5 12.5" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
═══════════════════════════════════════════════════ */
function Hero() {
  const [email, setEmail] = useState('');

  return (
    <section style={{ paddingTop: 80 + 64, paddingBottom: 40 }}>
      <div style={wrap()}>
        <h1 style={{
          fontSize: 28, fontWeight: 500, color: C.text1,
          lineHeight: '36px', letterSpacing: '-0.84px',
          margin: '0 0 10px',
        }}>
          الأفكار
        </h1>
        <p style={{
          fontSize: 16, fontWeight: 500, color: C.text2,
          margin: '0 0 20px', lineHeight: '26px',
        }}>
          ٦،٤٠٠ خبير عربي يتابعون النشرة البريديّة
        </p>

        {/* Newsletter form */}
        <div style={{
          display: 'flex',
          borderRadius: 8,
          overflow: 'hidden',
          border: `1px solid ${C.border}`,
          maxWidth: 400,
        }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="hala@moedesigns.io"
            style={{
              flex: 1, padding: '11px 14px',
              background: C.surface, border: 'none', outline: 'none',
              fontSize: 15, color: C.text1,
              fontFamily: 'inherit', direction: 'ltr' as const,
            }}
          />
          <button style={{
            padding: '11px 16px',
            background: C.blue, border: 'none',
            fontSize: 12, fontWeight: 500, color: '#fff',
            cursor: 'pointer', flexShrink: 0, fontFamily: 'inherit',
            borderRadius: '0 8px 8px 0',
          }}>
            اشترك في النشرة
          </button>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ARTICLE ROW
═══════════════════════════════════════════════════ */
function ArticleRow({ title, isFirst }: { title: string; isFirst?: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <a
      href="#"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 0',
        borderTop: isFirst ? 'none' : `1px solid ${C.border}`,
        textDecoration: 'none',
        gap: 12,
        direction: 'rtl',
      }}
    >
      <h2 style={{
        fontSize: 16,
        fontWeight: 500,
        color: hov ? C.text1 : C.text2,
        margin: 0,
        lineHeight: '24px',
        transition: 'color 0.15s',
        flex: 1,
      }}>
        {title}
      </h2>
      <Dots size={11} />
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   MAIN CONTENT (2-column)
═══════════════════════════════════════════════════ */
function MainContent() {
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? articles.filter(a => a.includes(search.trim()))
    : articles;

  return (
    <section style={{ paddingBottom: 80 }}>
      <div style={wrap()}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          direction: 'rtl',
        }}>

          {/* ── Left sidebar: categories ── */}
          <aside style={{
            width: 109,
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            paddingTop: 2,
          }}>
            {categories.map(cat => (
              <a
                key={cat}
                href="#"
                style={{
                  display: 'inline-block',
                  background: 'rgb(46, 30, 22)',
                  color: C.orange,
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 12,
                  fontWeight: 400,
                  textDecoration: 'none',
                  lineHeight: '20px',
                  whiteSpace: 'nowrap' as const,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {cat}
              </a>
            ))}
          </aside>

          {/* ── Right column: search + articles ── */}
          <div style={{ flex: 1, minWidth: 0 }}>

            {/* Search bar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              border: `1px solid ${C.border}`,
              borderRadius: 8,
              padding: '9px 12px',
              marginBottom: 8,
              background: 'transparent',
              direction: 'rtl',
            }}>
              <SearchIcon />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="ابحث عن مقال"
                style={{
                  flex: 1,
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  color: C.text1,
                  fontFamily: 'inherit',
                  direction: 'rtl' as const,
                }}
              />
            </div>

            {/* Articles list */}
            <div>
              {filtered.map((title, i) => (
                <ArticleRow key={i} title={title} isFirst={i === 0} />
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
export default function BlogPage() {
  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <NavbarInner />
      <main>
        <Hero />
        <MainContent />
        <Footer />
      </main>
    </div>
  );
}
