'use client';
import { useState, useEffect, useRef, CSSProperties } from 'react';
import Image from 'next/image';

const C = {
  bg:          '#0f0f0f',
  surface:     '#171717',
  surface2:    '#1e1e1e',
  text1:       '#ededed',
  text2:       '#d9d9d9',
  text3:       '#888888',
  border:      'rgba(255,255,255,0.07)',
  borderHover: 'rgba(255,255,255,0.14)',
  blue:        '#2151ff',
};

const W = 880; const GUTTER = 40;
function wrap(extra: CSSProperties = {}): CSSProperties {
  return { maxWidth: W, margin: '0 auto', padding: `0 ${GUTTER}px`, width: '100%', ...extra };
}

const episodes = [
  { title: 'السر الذي تجاهلته نايكي: لماذا التركيز أهم من التوسع؟', date: 'منذ شهرين', duration: '24:29' },
  { title: 'كيف تبني نظام تسعير يجعلك تبيع أكثر بجهد أقل؟', date: 'منذ ٣ أشهر', duration: '31:14' },
  { title: 'لماذا أفضل الخبير الذي يبيع المشكلة على الحِرفة؟', date: 'منذ ٤ أشهر', duration: '28:07' },
  { title: 'مشروع لايف ستايل أو شركة؟ كيف تختار الأنسب لك', date: 'منذ ٥ أشهر', duration: '22:53' },
  { title: 'العميل لا يشتري خدمة — يشتري توكيلاً للمخاطرة', date: 'منذ ٥ أشهر', duration: '19:40' },
  { title: 'فخ التعدد: لماذا منتجات أكثر = إيرادات أقل', date: 'منذ ٦ أشهر', duration: '26:18' },
  { title: 'مكالمة البيع التي ضاعفت حجم مشروعي ٣ مرات', date: 'منذ ٧ أشهر', duration: '34:55' },
  { title: 'الشفافية في التسعير: كيف تجعل السعر يبيع نفسه', date: 'منذ ٧ أشهر', duration: '21:30' },
  { title: 'ماذا تستطيع أن تبيع في عصر تشات جي بي تي؟', date: 'منذ ٨ أشهر', duration: '29:02' },
  { title: 'للخبراء: كيف تحوّل معرفتك إلى مبيعات مضمونة', date: 'منذ ٩ أشهر', duration: '27:41' },
];

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

function Dots({ size = 13 }: { size?: number }) {
  return <span style={{ fontSize: size, letterSpacing: '3px', color: C.text3, lineHeight: 1, userSelect: 'none' as const }}>···</span>;
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

/* ── Search Icon ── */
function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <circle cx="6.5" cy="6.5" r="5" stroke="#888" strokeWidth="1.2" />
      <path d="M10.5 10.5L13.5 13.5" stroke="#888" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ── Play Button ── */
function PlayBtn() {
  const [hov, setHov] = useState(false);
  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
        background: hov ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background 0.2s',
      }}>
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
        <path d="M1 1.5l10 5-10 5V1.5z" fill={C.text3} />
      </svg>
    </div>
  );
}

/* ── Episode Row ── */
function EpisodeRow({ title, date, duration, isFirst }: typeof episodes[0] & { isFirst?: boolean }) {
  const [hov, setHov] = useState(false);

  return (
    <div style={{
      borderTop: isFirst ? 'none' : `1px solid ${C.border}`,
      padding: '14px 16px',
      borderRadius: isFirst ? '10px 10px 0 0' : '0',
      background: hov ? 'rgba(255,255,255,0.02)' : 'transparent',
      transition: 'background 0.15s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, direction: 'rtl' }}>
        <PlayBtn />
        <div style={{ flex: 1, minWidth: 0 }}>
          <p onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
            style={{ fontSize: 14, fontWeight: 500, color: hov ? C.text1 : C.text2, margin: '0 0 4px', lineHeight: '20px', cursor: 'pointer', transition: 'color 0.15s' }}>
            {title}
          </p>
          <p style={{ fontSize: 12, color: C.text3, margin: 0 }}>{date} · {duration}</p>
        </div>
        {/* Platform links */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <PlatformBadge label="YouTube" color="#ff3b30" />
          <PlatformBadge label="Spotify" color="#1db954" />
          <PlatformBadge label="Apple" color="#b94fff" />
        </div>
        {/* Thumbnail */}
        <div style={{ width: 44, height: 44, borderRadius: 6, overflow: 'hidden', flexShrink: 0, background: C.surface2 }}>
          <Image src="/images/avatar.png" alt="podcast" width={44} height={44} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  );
}

function PlatformBadge({ label, color }: { label: string; color: string }) {
  const [hov, setHov] = useState(false);
  return (
    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        padding: '4px 8px', borderRadius: 6, fontSize: 11, fontWeight: 500,
        background: hov ? color + '33' : color + '1a',
        color: color, textDecoration: 'none', transition: 'background 0.15s',
        whiteSpace: 'nowrap' as const,
      }}>
      {label}
    </a>
  );
}

/* ── Page ── */
export default function PodcastPage() {
  const [search, setSearch] = useState('');
  const filtered = search.trim() ? episodes.filter(e => e.title.includes(search.trim())) : episodes;

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <NavbarInner />
      <main>
        {/* Hero */}
        <section style={{ paddingTop: 80 + 64, paddingBottom: 40 }}>
          <div style={wrap()}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, direction: 'rtl', marginBottom: 32 }}>
              {/* Podcast cover */}
              <div style={{
                width: 100, height: 100, borderRadius: 12, overflow: 'hidden', flexShrink: 0,
                background: '#111', border: `1px solid ${C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <Image src="/images/avatar.png" alt="بودكاست حكيم" fill style={{ objectFit: 'cover', opacity: 0.85 }} />
                <div style={{
                  position: 'absolute', inset: 0, display: 'flex', alignItems: 'flex-end',
                  justifyContent: 'flex-end', padding: '6px',
                }}>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#d4a017', letterSpacing: '-0.5px' }}>حكيم</span>
                </div>
              </div>
              <div>
                <h1 style={{ fontSize: 26, fontWeight: 600, color: C.text1, margin: '0 0 4px', letterSpacing: '-0.6px' }}>
                  بودكاست حكيم
                </h1>
                <p style={{ fontSize: 14, color: C.text3, margin: '0 0 6px' }}>محمّد الحكيم</p>
                <p style={{ fontSize: 13, color: C.text2, margin: 0, lineHeight: '20px' }}>
                  ابني مشروعك الاستشاري وبيع الخبرة بدل الخدمة
                </p>
              </div>
            </div>

            {/* Search */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              border: `1px solid ${C.border}`, borderRadius: 10,
              padding: '10px 14px', direction: 'rtl', marginBottom: 24,
            }}>
              <SearchIcon />
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="...ابحث في الحلقات"
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: 14, color: C.text1, fontFamily: 'inherit', direction: 'rtl' }} />
            </div>

            {/* Section label */}
            <p style={{ fontSize: 14, fontWeight: 500, color: C.text2, margin: '0 0 8px', textAlign: 'right' }}>الحلقات</p>

            {/* Episodes list */}
            <div style={{
              border: `1px solid ${C.border}`, borderRadius: 10, overflow: 'hidden',
            }}>
              {filtered.map((ep, i) => (
                <EpisodeRow key={i} {...ep} isFirst={i === 0} />
              ))}
              {filtered.length === 0 && (
                <p style={{ textAlign: 'center', padding: '40px', color: C.text3, fontSize: 14 }}>لا توجد نتائج</p>
              )}
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
