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
  blue:        '#2151ff',
};

const W = 880; const GUTTER = 40;
function wrap(extra: CSSProperties = {}): CSSProperties {
  return { maxWidth: W, margin: '0 auto', padding: `0 ${GUTTER}px`, width: '100%', ...extra };
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
        color: hov ? C.text1 : C.text2,
        fontSize: 13, transition: 'background 0.15s, color 0.15s', direction: 'rtl',
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
          {/* Dots with dropdown */}
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
          <span style={{ fontSize: 11, letterSpacing: '3px', color: C.text3, lineHeight: 1, userSelect: 'none' }}>···</span>
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

/* ── Contact Form ── */
function ContactPage() {
  const [form, setForm] = useState({ name: '', social: '', email: '', package: '', budget: '', about: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm(p => ({ ...p, [k]: e.target.value }));

  const inputStyle: CSSProperties = {
    width: '100%', padding: '12px 14px', background: C.surface,
    border: `1px solid ${C.border}`, borderRadius: 8, outline: 'none',
    fontSize: 14, color: C.text1, fontFamily: 'inherit',
    direction: 'rtl', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const labelStyle: CSSProperties = { fontSize: 14, color: C.text2, marginBottom: 8, display: 'block', textAlign: 'right' };

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>
      <NavbarInner />
      <main>
        <section style={{ paddingTop: 80 + 64, paddingBottom: 80 }}>
          <div style={wrap()}>
            <h1 style={{ fontSize: 28, fontWeight: 500, color: C.text1, letterSpacing: '-0.84px', margin: '0 0 40px', lineHeight: '36px' }}>
              تواصل معي
            </h1>

            <div style={{
              background: C.surface, borderRadius: 12,
              border: `1px solid ${C.border}`, padding: '32px 36px',
              maxWidth: 600, marginRight: 'auto',
            }}>
              <p style={{ fontSize: 14, color: C.text2, margin: '0 0 28px', lineHeight: '22px', textAlign: 'right' }}>
                ترغب بالعمل سويّاً ولكنّك غير متأكّد؟ اكتب لي سبب ترددك وسوف أبلّغك إذا كنّا مناسبين للعمل سويّاً أم لا
              </p>
              <p style={{ fontSize: 16, fontWeight: 500, color: C.text1, margin: '0 0 24px', textAlign: 'right' }}>
                قدّم طلب للعمل سويّاً.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Name */}
                <div>
                  <label style={labelStyle}>الاسم</label>
                  <input value={form.name} onChange={set('name')} placeholder="حكيم" style={inputStyle} />
                </div>

                {/* Social */}
                <div>
                  <label style={labelStyle}>حسابك الأساسي على السوشال ميديا</label>
                  <input value={form.social} onChange={set('social')} placeholder="@mo.alhakeem" style={{ ...inputStyle, direction: 'ltr' }} />
                </div>

                {/* Email */}
                <div>
                  <label style={labelStyle}>بريدك الالكتروني</label>
                  <input type="email" value={form.email} onChange={set('email')} placeholder="hala@moedesigns.io" style={{ ...inputStyle, direction: 'ltr' }} />
                </div>

                {/* Package */}
                <div>
                  <label style={labelStyle}>الباقة</label>
                  <select value={form.package} onChange={set('package')} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
                    <option value="">Select…</option>
                    <option>استراتيجيّة البراند</option>
                    <option>بناء شركة من فرد واحد</option>
                    <option>موقع الكتروني</option>
                    <option>منصّة تعليميّة</option>
                  </select>
                </div>

                {/* Budget */}
                <div>
                  <label style={labelStyle}>
                    الميزانيّة
                    <span style={{ fontSize: 12, color: C.text3, marginRight: 8 }}>الباقات أسعارها موضّحة في صفحة الخدمات</span>
                  </label>
                  <select value={form.budget} onChange={set('budget')} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}>
                    <option value="">Select…</option>
                    <option>5-10K$</option>
                    <option>10K-30K$</option>
                  </select>
                </div>

                {/* About */}
                <div>
                  <label style={labelStyle}>نبذة عن مشروعك</label>
                  <textarea value={form.about} onChange={set('about')}
                    placeholder="أساعد كذا على كذا. لي 3 سنوات ودخلي 35 ألف شهرياً"
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: '22px' }} />
                </div>

                {/* Submit */}
                <button style={{
                  width: '100%', padding: '13px', background: C.text1,
                  border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500,
                  color: C.bg, cursor: 'pointer', fontFamily: 'inherit',
                  transition: 'opacity 0.2s',
                }}>
                  تواصل معنا
                </button>
              </div>
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
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              {['Bali / Dubai', 'hala@moedesigns.io', 'نشــرة', 'احجز استشارة 💤'].map((item, i, arr) => {
                const [hov, setHov] = useState(false);
                return (
                  <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <a href="#" onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
                      style={{ fontSize: 13, color: hov ? C.text2 : C.text3, textDecoration: 'none', transition: 'color 0.15s' }}>{item}</a>
                    {i < arr.length - 1 && <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: 14, userSelect: 'none' }}>·</span>}
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

export default ContactPage;
