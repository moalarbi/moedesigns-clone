'use client'

import { useState, useEffect, useRef } from 'react'

// ── DATA ─────────────────────────────────────────────────────────────
const navLinks = [
  { label: 'المقالات', href: '#articles' },
  { label: 'الأعمال', href: '#portfolio' },
  { label: 'الخدمات', href: '#services' },
  { label: 'المنتجات', href: '#products' },
]

const heroCards = [
  {
    label: 'ابدأ معي',
    title: 'احجز استشارة',
    desc: 'جلسة مباشرة معي',
    color: '#3ecf5c',
    icon: '📅',
    href: '#',
  },
  {
    label: 'المقالات',
    title: '١٥٠ مقال',
    desc: 'في بيع الخبرات',
    color: '#2151ff',
    icon: '📝',
    href: '#articles',
  },
  {
    label: 'اعمل معي',
    title: 'خدماتي والباقات',
    desc: 'استشارات وتصميم',
    color: '#ff7b0f',
    icon: '🚀',
    href: '#services',
  },
]

const portfolioItems = [
  { title: 'Luniva', category: 'موقع تجاري', color: '#6b8a4a', img: '' },
  { title: 'شارك', category: 'منصّة تدريبيّة', color: '#8B6F47', img: '' },
  { title: 'نشرة', category: 'منصّة SaaS', color: '#4a6b8a', img: '' },
  { title: 'منصّة خبرة', category: 'موقع تجاري', color: '#7a4a6b', img: '' },
  { title: 'أكاديمية ريادة', category: 'منصّة تدريبيّة', color: '#6b4a3a', img: '' },
  { title: 'برند بيرسونال', category: 'هويّة بصريّة', color: '#3a6b4a', img: '' },
]

const stats = [
  { value: '٧', unit: 'سنوات', label: 'من الخبرة' },
  { value: '٨٠+', unit: 'مؤسّس', label: 'تمّ مساعدتهم' },
  { value: '٤٠٠٪', unit: 'ROI', label: 'عائد استثمار' },
]

const clients = [
  'Wfrah', 'McKinsey', 'Mindvalley', 'RASF', 'Salla', 'Zid', 'Foodics',
  'Wfrah', 'McKinsey', 'Mindvalley', 'RASF', 'Salla', 'Zid', 'Foodics',
]

const products = [
  { type: 'دورة مسجّلة', title: 'المنهجيّة في الكتابة الإعلانيّة', price: '$249', bg: '#1a1a2e' },
  { type: 'دورة رقميّة', title: 'دورة تصميم وبناء المواقع', price: '$199', bg: '#1a2e1a' },
  { type: 'كتيّب رقمي', title: 'كتيّب استراتيجيّة البراند', price: '$69', bg: '#2e1a1a' },
  { type: 'ورشة', title: 'ورشة بيع الخدمات الأغلى', price: '$35', bg: '#1a2a2e' },
]

const articles = [
  'منهجيّتي لبيع الخدمات الأغلى ثمناً',
  '٤ قِيَم تُحدّد سعر خدماتك',
  'تقرير: هل ما زال بيع الدورات مشروعاً مُربحاً؟',
  'كيف تبني براند شخصي يبيع وأنت نائم',
  'الدليل الكامل لتأسيس مشروع استشاري ناجح',
  'أسرار التسعير عند كبار الخبراء',
]

// ── NAVBAR ────────────────────────────────────────────────────────────
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0f0f0f]/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between" dir="rtl">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-[#2151ff] flex items-center justify-center text-white font-bold text-sm">
            م
          </div>
          <span className="text-[#ebebeb] font-semibold text-lg hidden sm:block">محمّد الحكيم</span>
        </a>

        {/* Nav links – desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#888] hover:text-[#ebebeb] text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          {/* Dots menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#888] hover:text-[#ebebeb] transition-colors text-lg"
          >
            ···
          </button>
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:block px-5 py-2 rounded-full bg-[#2151ff] text-white text-sm font-medium hover:opacity-90 hover:shadow-[0_0_20px_rgba(33,81,255,0.4)] transition-all duration-200"
        >
          ابدأ باستشارة
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-[#ebebeb] text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#171717] border-t border-white/5 px-6 py-4 flex flex-col gap-4" dir="rtl">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[#d9d9d9] text-sm hover:text-white"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-block px-5 py-2.5 rounded-full bg-[#2151ff] text-white text-sm font-medium text-center"
          >
            ابدأ باستشارة
          </a>
        </div>
      )}
    </nav>
  )
}

// ── HERO ──────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Glow BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#2151ff]/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#ff7b0f]/6 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative" dir="rtl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2151ff]/30 bg-[#2151ff]/10 text-[#2151ff] text-sm mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-[#3ecf5c] animate-pulse" />
          متاح للمشاريع الجديدة
        </div>

        {/* Headline */}
        <h1
          className="font-bold text-[#ebebeb] leading-tight mb-6 animate-slide-up"
          style={{ fontSize: 'clamp(40px, 5.5vw, 72px)', maxWidth: '800px' }}
        >
          مستشارك في
          <br />
          <span className="text-[#ff7b0f]">بيع الخبرات</span>
          <br />
          وتأسيس المشاريع
        </h1>

        {/* Subheading */}
        <p
          className="text-[#888888] mb-10 max-w-lg leading-relaxed animate-slide-up delay-200"
          style={{ fontSize: 'clamp(15px, 1.3vw, 19px)' }}
        >
          خلال ٧ سنوات ساعدت أكثر من ٨٠ مؤسّس يبدأ مشروعه في بيع الخبرات بعائد استثمار يبدأ من ٤٠٠٪
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-3 mb-16 animate-slide-up delay-300">
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-full bg-[#2151ff] text-white font-medium hover:opacity-90 hover:shadow-[0_0_30px_rgba(33,81,255,0.45)] transition-all duration-200"
            style={{ fontSize: '15px' }}
          >
            احجز استشارة مجّانيّة
          </a>
          <a
            href="#portfolio"
            className="px-7 py-3.5 rounded-full bg-white/5 border border-white/10 text-[#ebebeb] hover:bg-white/10 transition-all duration-200"
            style={{ fontSize: '15px' }}
          >
            شاهد أعمالي ←
          </a>
        </div>

        {/* Hero Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-slide-up delay-400">
          {heroCards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group relative p-5 rounded-2xl bg-[#171717] border border-white/5 hover:border-white/10 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <div
                className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[60px] opacity-20 group-hover:opacity-40 transition-opacity"
                style={{ backgroundColor: card.color }}
              />
              <div className="relative">
                <span className="text-2xl mb-3 block">{card.icon}</span>
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full mb-2 inline-block"
                  style={{ backgroundColor: `${card.color}20`, color: card.color }}
                >
                  {card.label}
                </span>
                <h3 className="text-[#ebebeb] font-semibold text-lg">{card.title}</h3>
                <p className="text-[#888] text-sm mt-1">{card.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── STATS ────────────────────────────────────────────────────────────
function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="py-20 px-6 border-y border-white/5">
      <div className="max-w-5xl mx-auto" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="text-5xl font-bold text-[#ebebeb] mb-1">
                {stat.value}
                <span className="text-[#ff7b0f] text-3xl mr-1">{stat.unit}</span>
              </div>
              <div className="text-[#888] text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── PORTFOLIO ────────────────────────────────────────────────────────
function Portfolio() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="portfolio" ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto" dir="rtl">
        {/* Header */}
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#ff7b0f] text-sm font-medium mb-2 block">الأعمال</span>
          <h2 className="font-bold text-[#ebebeb]" style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
            أحدث أعمالي
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {portfolioItems.map((item, i) => (
            <div
              key={item.title}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${i * 100}ms`,
                background: `linear-gradient(135deg, ${item.color}40 0%, ${item.color}15 100%)`,
                border: '1px solid rgba(255,255,255,0.06)',
                minHeight: '240px',
              }}
              onClick={() => setActive(i)}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 right-0 left-0 p-5">
                <span
                  className="text-xs font-medium px-3 py-1 rounded-full mb-2 inline-block"
                  style={{ backgroundColor: `${item.color}30`, color: '#d9d9d9' }}
                >
                  {item.category}
                </span>
                <h3 className="text-[#ebebeb] font-bold text-xl">{item.title}</h3>
              </div>

              {/* Hover arrow */}
              <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                ←
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-block px-7 py-3 rounded-full bg-white/5 border border-white/10 text-[#d9d9d9] text-sm hover:bg-white/10 transition-all"
          >
            عرض جميع الأعمال ←
          </a>
        </div>
      </div>
    </section>
  )
}

// ── CLIENTS ───────────────────────────────────────────────────────────
function Clients() {
  return (
    <section className="py-14 px-6 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto" dir="rtl">
        <p className="text-center text-[#888] text-sm mb-8">عملائي يشملون</p>
        <div className="relative">
          <div className="flex gap-12 animate-scroll-left" style={{ width: 'max-content' }}>
            {clients.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="text-[#555] hover:text-[#888] text-base font-medium whitespace-nowrap transition-colors cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ── PRODUCTS ──────────────────────────────────────────────────────────
function Products() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="products" ref={ref} className="py-24 px-6">
      <div className="max-w-7xl mx-auto" dir="rtl">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#2151ff] text-sm font-medium mb-2 block">المنتجات</span>
          <h2 className="font-bold text-[#ebebeb]" style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
            أحدث المنتجات
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product, i) => (
            <div
              key={product.title}
              className={`group rounded-2xl border border-white/5 hover:border-white/10 overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-1 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{
                backgroundColor: product.bg,
                transitionDelay: `${i * 100}ms`,
              }}
            >
              {/* Thumbnail area */}
              <div className="h-40 flex items-center justify-center relative overflow-hidden">
                <div
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: `radial-gradient(circle at 30% 70%, ${i === 0 ? '#2151ff' : i === 1 ? '#3ecf5c' : i === 2 ? '#ff7b0f' : '#9b59b6'}40 0%, transparent 70%)`,
                  }}
                />
                <span className="text-4xl relative z-10">
                  {i === 0 ? '✍️' : i === 1 ? '🎨' : i === 2 ? '📖' : '🎤'}
                </span>
              </div>
              {/* Info */}
              <div className="p-4">
                <span className="text-xs text-[#888] bg-white/5 px-2 py-0.5 rounded-full">{product.type}</span>
                <h3 className="text-[#ebebeb] text-sm font-medium mt-2 leading-snug">{product.title}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[#ff7b0f] font-bold">{product.price}</span>
                  <span className="text-xs text-[#888] group-hover:text-[#ebebeb] transition-colors">شراء ←</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── ARTICLES ──────────────────────────────────────────────────────────
function Articles() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="articles" ref={ref} className="py-24 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto" dir="rtl">
        <div className={`mb-12 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <span className="text-[#3ecf5c] text-sm font-medium mb-2 block">المدوّنة</span>
          <h2 className="font-bold text-[#ebebeb]" style={{ fontSize: 'clamp(28px, 3vw, 42px)' }}>
            آخر المقالات
          </h2>
        </div>

        <div className="flex flex-col">
          {articles.map((article, i) => (
            <a
              key={article}
              href="#"
              className={`group flex items-center justify-between py-5 border-b border-white/5 hover:bg-white/2 transition-all duration-700 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="text-[#333] text-sm font-mono">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[#d9d9d9] group-hover:text-[#ebebeb] transition-colors" style={{ fontSize: 'clamp(14px, 1.2vw, 17px)' }}>
                  {article}
                </h3>
              </div>
              <span className="text-[#555] group-hover:text-[#888] transition-colors text-lg flex-shrink-0 mr-4">←</span>
            </a>
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-block px-7 py-3 rounded-full bg-white/5 border border-white/10 text-[#d9d9d9] text-sm hover:bg-white/10 transition-all"
          >
            عرض جميع المقالات ←
          </a>
        </div>
      </div>
    </section>
  )
}

// ── CTA SECTION ───────────────────────────────────────────────────────
function CTASection() {
  return (
    <section id="contact" className="py-28 px-6">
      <div className="max-w-4xl mx-auto text-center relative" dir="rtl">
        {/* Glow */}
        <div className="absolute inset-0 bg-[#2151ff]/5 rounded-3xl blur-[80px] pointer-events-none" />

        <div className="relative bg-[#171717] border border-white/8 rounded-3xl p-12 sm:p-16">
          {/* Accent line */}
          <div className="w-16 h-1 bg-gradient-to-l from-[#2151ff] to-[#ff7b0f] rounded-full mx-auto mb-8" />

          <h2
            className="font-bold text-[#ebebeb] mb-4"
            style={{ fontSize: 'clamp(28px, 3.5vw, 48px)' }}
          >
            تبحث عن خدماتي؟
          </h2>
          <p className="text-[#888] mb-10 text-base leading-relaxed">
            سواء كنت تبحث عن استشارة تأسيسيّة أو شراكة استراتيجيّة — أنا هنا.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:hala@moedesigns.io"
              className="px-8 py-3.5 rounded-full bg-[#2151ff] text-white font-medium hover:opacity-90 hover:shadow-[0_0_30px_rgba(33,81,255,0.4)] transition-all duration-200"
            >
              تواصل معي
            </a>
            <a
              href="#services"
              className="px-8 py-3.5 rounded-full bg-white/5 border border-white/10 text-[#ebebeb] hover:bg-white/10 transition-all"
            >
              الخدمات والباقات
            </a>
          </div>

          <p className="mt-8 text-[#555] text-sm">
            أو راسلني على{' '}
            <a href="mailto:hala@moedesigns.io" className="text-[#888] hover:text-[#ebebeb] transition-colors underline decoration-dotted">
              hala@moedesigns.io
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}

// ── FOOTER ───────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto" dir="rtl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#2151ff] flex items-center justify-center text-white font-bold text-xs">م</div>
              <span className="text-[#ebebeb] font-semibold">محمّد الحكيم</span>
            </div>
            <p className="text-[#555] text-sm leading-relaxed">
              مستشار في بيع الخبرات وتأسيس المشاريع الرقميّة.
              <br />بالي / دبي
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-[#888] text-xs font-medium mb-4 uppercase tracking-wider">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              {['المقالات', 'الأعمال', 'الخدمات', 'المنتجات', 'البودكاست'].map(link => (
                <a key={link} href="#" className="text-[#555] hover:text-[#d9d9d9] text-sm transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[#888] text-xs font-medium mb-4 uppercase tracking-wider">النشرة البريديّة</h4>
            <p className="text-[#555] text-sm mb-4">تواصل مع متابعينك مباشرة</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="flex-1 bg-[#212121] border border-white/8 rounded-xl px-4 py-2.5 text-sm text-[#d9d9d9] placeholder:text-[#444] focus:outline-none focus:border-[#2151ff]/40 transition-colors"
                dir="rtl"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#2151ff] text-white text-sm font-medium hover:opacity-90 transition-opacity flex-shrink-0"
              >
                انضم
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/5">
          <p className="text-[#444] text-xs">
            © {new Date().getFullYear()} محمّد الحكيم · جميع الحقوق محفوظة
          </p>
          <a
            href="https://nashra.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#444] hover:text-[#888] text-xs transition-colors"
          >
            مدعوم بـ Nashra.ai ↗
          </a>
        </div>
      </div>
    </footer>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] font-arabic" dir="rtl">
      <Navbar />
      <Hero />
      <Stats />
      <Portfolio />
      <Clients />
      <Products />
      <Articles />
      <CTASection />
      <Footer />
    </div>
  )
}
