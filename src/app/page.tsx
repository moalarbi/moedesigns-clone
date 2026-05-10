'use client'
import { useState, useEffect, useRef } from 'react'

/* ══════════════════════════════════════════════════════
   DATA  —  exact text from moedesigns.io
══════════════════════════════════════════════════════ */
const portfolioItems = [
  { id:1, title:'Luniva',  cat:'موقع تجاري',      bg:'#7c5a3e', accent:'#a8724a' },
  { id:2, title:'شارك',    cat:'منصّة تدريبيّة',   bg:'#3d5a3e', accent:'#4e7a50' },
  { id:3, title:'برند',    cat:'هويّة بصريّة',     bg:'#4a3d5a', accent:'#6a5a7a' },
  { id:4, title:'نشرة',    cat:'منصّة SaaS',       bg:'#3a4d5a', accent:'#4a6d7a' },
  { id:5, title:'أكاديمية','cat':'منصّة تدريبيّة', bg:'#5a3d3a', accent:'#7a5550' },
  { id:6, title:'استشارة', cat:'موقع تجاري',       bg:'#3d4a3a', accent:'#556a52' },
]

const products = [
  { type:'دورة مسجّلة', title:'المنهجيّة في الكتابة الإعلانيّة',   price:'$249', emoji:'✍️', bg:'#1a1830' },
  { type:'دورة رقميّة', title:'دورة تصميم وبناء المواقع',            price:'$199', emoji:'🖥️', bg:'#0f1f18' },
  { type:'كتيّب رقمي',  title:'كتيّب استراتيجيّة البراند',          price:'$69',  emoji:'📖', bg:'#1e1408' },
  { type:'ورشة',        title:'ورشة بيع الخدمات الأغلى ثمناً',     price:'$35',  emoji:'🎤', bg:'#0d1520' },
]

const services = [
  'البيع والتسعير',
  'السوشال ميديا والإعلام',
  'التسويق والتوسّع',
  'الاستراتيجيّة والتمركز',
  'بناء المشروع والمنتجات',
]

const articles = [
  { title:'منهجيّتي لبيع الخدمات الأغلى | Hight ticket',                                  thumb:'' },
  { title:'٤ قِيَم. كُل أصحاب البراندات الناجحة كانت عندهم',                               thumb:'👤' },
  { title:'تقرير: هل ما زال بيع الدورات مشروع مُربح؟',                                    thumb:'' },
  { title:'٣ أسئلة قبل أن أبدأ بأي مشروع',                                                thumb:'📕' },
  { title:'درست حَملات أفضل من يبيعون المنتجات الرقميّة. اتّضح أن لديهم سر.',             thumb:'' },
  { title:'التخصّص يحميك من تجاوزاتك الفكريّة',                                           thumb:'🍴' },
  { title:'لماذا أفضّل التخصّص في المُشكلة وليس في التكنيك (الحِرفة)؟',                   thumb:'' },
  { title:'٤ تخصّصات استشاريّة ستحقق الملايين بحلول ٢٠٢٨',                               thumb:'📈' },
]

const clients = ['Wfrah','McKinsey & Company','Mindvalley','RASF','Salla','Zid','Foodics','Almosafer']

/* ══════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive:true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position:'fixed', top:0, right:0, left:0, zIndex:50,
      transition:'background 0.3s, border-color 0.3s',
      background: scrolled ? 'rgba(15,15,15,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
    }}>
      <div className="container" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', height:68, direction:'rtl' }}>

        {/* RIGHT: avatar + nav links + dots */}
        <div style={{ display:'flex', alignItems:'center', gap:32 }}>
          {/* Avatar */}
          <div style={{
            width:36, height:36, borderRadius:'50%',
            background:'linear-gradient(135deg,#555,#333)',
            border:'1.5px solid rgba(255,255,255,0.15)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontSize:14, color:'#aaa', flexShrink:0, overflow:'hidden',
          }}>م</div>

          {/* Nav links */}
          <div style={{ display:'flex', gap:28 }} className="hidden-mobile">
            {['المنتجات','الخدمات','الأعمال','المقالات'].map(l => (
              <a key={l} href="#" style={{
                fontSize:16, fontWeight:400, color:'#d9d9d9',
                transition:'color 0.2s', padding:'4px 0',
              }}
              onMouseEnter={e=>(e.currentTarget.style.color='#fff')}
              onMouseLeave={e=>(e.currentTarget.style.color='#d9d9d9')}
              >{l}</a>
            ))}
          </div>

          {/* Dots menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color:'#d9d9d9', fontSize:20, background:'none', border:'none', cursor:'pointer', letterSpacing:2, lineHeight:1 }}
          >···</button>
        </div>

        {/* LEFT: CTA button */}
        <button style={{
          fontSize:13, fontWeight:500, color:'#ededed',
          background:'rgba(255,255,255,0.04)',
          border:'1px solid rgba(255,255,255,0.12)',
          borderRadius:20, padding:'8px 18px',
          cursor:'pointer', display:'flex', alignItems:'center', gap:8,
          transition:'background 0.2s, border-color 0.2s',
          fontFamily:'inherit',
        }}
        onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.08)'; }}
        onMouseLeave={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.04)'; }}
        >
          <span style={{ fontSize:12, opacity:.5, letterSpacing:2 }}>···</span>
          ابدأ باستشارة
        </button>
      </div>

      {/* Dropdown */}
      {menuOpen && (
        <div style={{
          position:'absolute', top:68, right:0, left:0,
          background:'rgba(20,20,20,0.98)', backdropFilter:'blur(16px)',
          borderBottom:'1px solid rgba(255,255,255,0.06)',
          padding:'16px 48px 20px',
        }} dir="rtl">
          <div style={{ display:'flex', flexWrap:'wrap', gap:24 }}>
            {['مصادر مجّانيّة','البودكاست','التواصل','الوضع الليّلي'].map(i=>(
              <a key={i} href="#" style={{ color:'#d9d9d9', fontSize:15, transition:'color 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='#fff'}
              onMouseLeave={e=>e.currentTarget.style.color='#d9d9d9'}
              >{i}</a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

/* ══════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'center', paddingTop:100, paddingBottom:64 }} dir="rtl">
      <div className="container">

        {/* H1 */}
        <h1 style={{
          fontSize:'clamp(32px, 4vw, 56px)',
          fontWeight:500,
          color:'#ededed',
          lineHeight:1.3,
          letterSpacing:'-0.02em',
          maxWidth:700,
          marginBottom:64,
          animation:'fadeUp 0.7s ease forwards',
        }}>
          مستشار في بناء المشاريع<br />
          الاستشاريّة والتدريبيّة.<br />
          رائد أعمال وكاتب.
        </h1>

        {/* 3 Cards */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, maxWidth:900 }}>
          {/* Card 1 – ابدأ معي / احجز استشارة */}
          <HeroCard
            topLabel="ابدأ معي"
            mainText="احجز استشارة"
            accent="green"
            dot={true}
          />
          {/* Card 2 – المقالات */}
          <HeroCard
            topLabel="المقالات"
            mainText="١٥٠ مقال في بيع الخبرات"
            accent="none"
          />
          {/* Card 3 – اعمل معي */}
          <HeroCard
            topLabel="اعمل معي"
            mainText="خدماتي والباقات"
            accent="none"
          />
        </div>

        {/* Section label below */}
        <div style={{ marginTop:80, display:'flex', justifyContent:'flex-end' }}>
          <span style={{ fontSize:18, color:'#ededed', fontWeight:400 }}>
            أحدث أعمالي ←
          </span>
        </div>
      </div>
    </section>
  )
}

function HeroCard({ topLabel, mainText, accent, dot }: {
  topLabel:string; mainText:string; accent:string; dot?:boolean;
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#1e1e1e' : '#161616',
        border:'1px solid rgba(255,255,255,0.07)',
        borderRadius:16,
        padding:'20px 22px 22px',
        cursor:'pointer',
        transition:'background 0.25s, transform 0.25s',
        transform: hov ? 'translateY(-3px)' : 'none',
        minHeight:120,
        display:'flex', flexDirection:'column', justifyContent:'space-between',
      }}
    >
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
        <p style={{ fontSize:13, fontWeight:400, color:'#d9d9d9', opacity:.7 }}>{topLabel}</p>
        <div style={{ display:'flex', gap:3 }}>
          {dot && (
            <span style={{
              width:7, height:7, borderRadius:'50%',
              background:'#00c763', display:'inline-block',
              boxShadow:'0 0 8px #00c76366',
            }} className="dot-blink" />
          )}
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.15)', letterSpacing:2 }}>···</span>
        </div>
      </div>
      <p style={{ fontSize:18, fontWeight:400, color:'#ededed', lineHeight:1.35 }}>{mainText}</p>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   PORTFOLIO CAROUSEL
══════════════════════════════════════════════════════ */
function Portfolio() {
  const [idx, setIdx] = useState(0)
  const perView = 2
  const max = portfolioItems.length - perView

  return (
    <section style={{ paddingBottom:80 }} dir="rtl">
      <div className="container">
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:28 }}>
          <div /> {/* spacer */}
          <h2 style={{ fontSize:18, fontWeight:400, color:'#ededed' }}>أحدث أعمالي ←</h2>
        </div>

        {/* Arrows */}
        <div style={{ display:'flex', justifyContent:'flex-start', gap:8, marginBottom:20 }}>
          <CarouselBtn dir="right" onClick={() => setIdx(i => Math.max(0,i-1))} disabled={idx===0} />
          <CarouselBtn dir="left"  onClick={() => setIdx(i => Math.min(max,i+1))} disabled={idx>=max} />
        </div>

        {/* Track */}
        <div style={{ overflow:'hidden' }}>
          <div style={{
            display:'flex', gap:16,
            transform:`translateX(${idx * (50+1)}%)`,
            transition:'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {portfolioItems.map(item => (
              <PortfolioCard key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function CarouselBtn({ dir, onClick, disabled }: { dir:'left'|'right'; onClick:()=>void; disabled:boolean }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:36, height:36, borderRadius:'50%',
      background:'rgba(255,255,255,0.04)',
      border:'1px solid rgba(255,255,255,0.1)',
      color: disabled ? 'rgba(255,255,255,0.2)' : '#d9d9d9',
      fontSize:16, cursor: disabled ? 'default' : 'pointer',
      display:'flex', alignItems:'center', justifyContent:'center',
      transition:'background 0.2s',
    }}>{dir==='right' ? '→' : '←'}</button>
  )
}

function PortfolioCard({ title, cat, bg, accent }: typeof portfolioItems[0]) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        flexShrink:0,
        width:'calc(50% - 8px)',
        minHeight:380,
        borderRadius:20,
        background:`linear-gradient(145deg, ${bg} 0%, ${accent}88 100%)`,
        position:'relative', overflow:'hidden',
        cursor:'pointer',
        transform: hov ? 'scale(1.01)' : 'scale(1)',
        transition:'transform 0.3s ease',
        border:'1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Browser mockup */}
      <div style={{
        margin:'32px 28px 0',
        background:'#fff',
        borderRadius:'12px 12px 0 0',
        overflow:'hidden',
        height:260,
        boxShadow:'0 8px 32px rgba(0,0,0,0.4)',
      }}>
        {/* Browser chrome */}
        <div style={{ background:'#f0f0f0', padding:'8px 12px', display:'flex', alignItems:'center', gap:6 }}>
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#ff5f57', display:'inline-block' }} />
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#ffbe2e', display:'inline-block' }} />
          <span style={{ width:8, height:8, borderRadius:'50%', background:'#27c840', display:'inline-block' }} />
          <span style={{ flex:1, background:'#e0e0e0', borderRadius:4, height:14, marginRight:8 }} />
        </div>
        {/* Website preview */}
        <div style={{
          height:'100%',
          background:`linear-gradient(160deg, ${bg}cc 0%, #111 100%)`,
          display:'flex', alignItems:'center', justifyContent:'center',
        }}>
          <span style={{ color:'rgba(255,255,255,0.3)', fontSize:32, fontWeight:700 }}>{title}</span>
        </div>
      </div>

      {/* Info */}
      <div style={{ position:'absolute', bottom:0, right:0, left:0, padding:'20px 28px', background:'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
        <span style={{ fontSize:10, color:'#d9d9d9', opacity:.7, display:'block', marginBottom:4 }}>{cat}</span>
        <span style={{ fontSize:16, fontWeight:500, color:'#ededed' }}>{title}</span>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   STATS — "خلال ٧ سنوات..."
══════════════════════════════════════════════════════ */
function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true) }, { threshold:0.2 })
    if(ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])

  return (
    <section ref={ref} style={{ padding:'40px 0 60px' }} dir="rtl">
      <div className="container">
        <div style={{
          background:'#171717',
          borderRadius:16,
          padding:'36px 40px',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(20px)',
          transition:'opacity 0.7s ease, transform 0.7s ease',
        }}>
          <p style={{
            fontSize:'clamp(16px, 1.5vw, 20px)',
            fontWeight:400,
            color:'#ededed',
            lineHeight:1.8,
            textAlign:'right',
          }}>
            خلال{' '}
            <StatNum>٧ سنوات</StatNum>
            {' '}ساعدت{' '}
            <StatNum>80+</StatNum>
            {' '}مؤسّس ليبدأ مشروعه في بيع الخبرات.{' '}
            عُملائي يشهدون بعائد استثمار يبدأ من{' '}
            <StatNum>400%</StatNum>
            {' '}خلال السنة الأولى
          </p>
        </div>
      </div>
    </section>
  )
}

function StatNum({ children }: { children:React.ReactNode }) {
  return <span style={{ color:'#ededed', fontWeight:600 }}>{children}</span>
}

/* ══════════════════════════════════════════════════════
   CLIENTS TICKER
══════════════════════════════════════════════════════ */
function Clients() {
  const doubled = [...clients, ...clients]
  return (
    <section style={{ padding:'32px 0', overflow:'hidden', borderTop:'1px solid rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ display:'flex', gap:64, width:'max-content' }} className="scroll-ticker">
        {doubled.map((c,i) => (
          <span key={i} style={{ fontSize:15, color:'rgba(255,255,255,0.25)', whiteSpace:'nowrap', letterSpacing:.5 }}>{c}</span>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   NASHRA SECTION
══════════════════════════════════════════════════════ */
function NashraSection() {
  return (
    <section style={{ padding:'60px 0' }} dir="rtl">
      <div className="container">
        <div style={{
          background:'#171717',
          borderRadius:16,
          padding:'40px 44px',
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:48,
          alignItems:'center',
        }}>
          {/* Left: content */}
          <div>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.3)', letterSpacing:1, textTransform:'uppercase', display:'block', marginBottom:12 }}>Nashra.ai</span>
            <h3 style={{ fontSize:'clamp(22px,2.5vw,32px)', fontWeight:500, color:'#ededed', lineHeight:1.35, marginBottom:16 }}>
              نشرتك البريديّة + مدوّنتك
            </h3>
            <p style={{ fontSize:15, color:'#888', marginBottom:28 }}>تواصل مع متابعينك مباشرة</p>
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              {['الاشتراك والتفاصيل','تدعم الكتابة بالعربي','صفحات هبوط'].map(f => (
                <div key={f} style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ color:'#00c763', fontSize:14 }}>✓</span>
                  <span style={{ fontSize:14, color:'#d9d9d9' }}>{f}</span>
                </div>
              ))}
            </div>
            <a href="#" style={{ display:'inline-block', marginTop:28, fontSize:13, color:'#888', borderBottom:'1px solid rgba(255,255,255,0.1)', paddingBottom:2, transition:'color 0.2s' }}>
              تصميم محمّد الحكيم →
            </a>
          </div>
          {/* Right: newsletter preview */}
          <div style={{
            background:'linear-gradient(145deg,#1a1a2e,#12121e)',
            borderRadius:12,
            padding:'28px 24px',
            border:'1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display:'flex', gap:8, marginBottom:20 }}>
              {['🟠','🟣','🔵'].map((c,i) => (
                <span key={i} style={{ padding:'4px 12px', borderRadius:20, background:'rgba(255,255,255,0.06)', fontSize:11, color:'#888' }}>
                  {c} نشرة {i+1}
                </span>
              ))}
            </div>
            <div style={{ height:80, background:'rgba(255,255,255,0.03)', borderRadius:8, marginBottom:16 }} />
            <div style={{ height:12, background:'rgba(255,255,255,0.04)', borderRadius:4, marginBottom:8, width:'80%' }} />
            <div style={{ height:12, background:'rgba(255,255,255,0.04)', borderRadius:4, marginBottom:16, width:'60%' }} />
            <div style={{ display:'flex', gap:8 }}>
              <input placeholder="بريدك الإلكتروني" style={{
                flex:1, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:8, padding:'10px 14px', fontSize:13, color:'#d9d9d9',
                fontFamily:'inherit', outline:'none', direction:'rtl',
              }} />
              <button style={{
                background:'#2151ff', border:'none', borderRadius:8,
                padding:'10px 18px', fontSize:13, fontWeight:500, color:'#fff',
                cursor:'pointer', fontFamily:'inherit', whiteSpace:'nowrap',
              }}>اشترك</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   PRODUCTS CAROUSEL
══════════════════════════════════════════════════════ */
function Products() {
  const [idx, setIdx] = useState(0)
  const max = products.length - 3

  return (
    <section style={{ padding:'60px 0' }} dir="rtl">
      <div className="container">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:28 }}>
          <div style={{ display:'flex', gap:8 }}>
            <CarouselBtn dir="right" onClick={() => setIdx(i => Math.max(0,i-1))} disabled={idx===0} />
            <CarouselBtn dir="left"  onClick={() => setIdx(i => Math.min(max,i+1))} disabled={idx>=max} />
          </div>
          <h2 style={{ fontSize:18, fontWeight:400, color:'#ededed' }}>أحدث المنتجات</h2>
        </div>

        <div style={{ overflow:'hidden' }}>
          <div style={{
            display:'flex', gap:16,
            transform:`translateX(${idx * (33.33+.5)}%)`,
            transition:'transform 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}>
            {products.map((p,i) => <ProductCard key={i} {...p} />)}
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ type, title, price, emoji, bg }: typeof products[0]) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        flexShrink:0,
        width:'calc(33.33% - 11px)',
        borderRadius:16,
        overflow:'hidden',
        border:'1px solid rgba(255,255,255,0.06)',
        cursor:'pointer',
        transform: hov ? 'translateY(-4px)' : 'none',
        transition:'transform 0.25s ease',
        background:'#161616',
      }}
    >
      {/* Thumbnail */}
      <div style={{
        height:140, background: `linear-gradient(145deg, ${bg} 0%, #0a0a0a 100%)`,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:36,
      }}>{emoji}</div>
      {/* Info */}
      <div style={{ padding:'16px 18px 20px' }}>
        <span style={{
          fontSize:10, color:'#888', background:'rgba(255,255,255,0.05)',
          borderRadius:20, padding:'3px 10px', display:'inline-block', marginBottom:10,
        }}>{type}</span>
        <p style={{ fontSize:14, color:'#ededed', lineHeight:1.5, marginBottom:14 }}>{title}</p>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:13, color:'#888', opacity: hov ? 1 : 0.5, transition:'opacity 0.2s' }}>شراء →</span>
          <span style={{ fontSize:16, fontWeight:600, color:'#ededed' }}>{price}</span>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   SERVICES PILLS
══════════════════════════════════════════════════════ */
function ServicesPills() {
  const doubled = [...services, ...services]
  return (
    <section style={{ padding:'32px 0', overflow:'hidden' }} dir="rtl">
      <div style={{ display:'flex', gap:12, width:'max-content' }} className="scroll-ticker">
        {doubled.map((s,i) => (
          <div key={i} style={{
            padding:'10px 20px', borderRadius:20,
            border:'1px solid rgba(255,255,255,0.08)',
            background:'rgba(255,255,255,0.03)',
            fontSize:13, color:'#d9d9d9', whiteSpace:'nowrap',
            cursor:'pointer',
          }}>{s}</div>
        ))}
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   ARTICLES — 2 columns
══════════════════════════════════════════════════════ */
function Articles() {
  const ref = useRef<HTMLDivElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const ob = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVis(true) }, { threshold:0.1 })
    if(ref.current) ob.observe(ref.current)
    return () => ob.disconnect()
  }, [])

  // Split into 2 columns
  const withThumb  = articles.filter(a => a.thumb)
  const noThumb    = articles.filter(a => !a.thumb)

  return (
    <section ref={ref} style={{ padding:'60px 0' }} dir="rtl">
      <div className="container">
        {/* Header */}
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:32 }}>
          <div style={{ display:'flex', gap:8 }}>
            <CarouselBtn dir="right" onClick={()=>{}} disabled={false} />
            <CarouselBtn dir="left"  onClick={()=>{}} disabled={false} />
          </div>
          <h2 style={{ fontSize:18, fontWeight:400, color:'#ededed' }}>آخر المقالات ←</h2>
        </div>

        {/* 2 column grid */}
        <div style={{
          background:'#171717',
          borderRadius:16,
          overflow:'hidden',
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          opacity: vis ? 1 : 0,
          transform: vis ? 'none' : 'translateY(24px)',
          transition:'opacity 0.7s, transform 0.7s',
        }}>
          {/* RIGHT column: with thumbs */}
          <div style={{ borderLeft:'1px solid rgba(255,255,255,0.05)' }}>
            {withThumb.map((a,i) => (
              <ArticleRow key={i} title={a.title} thumb={a.thumb} border={i>0} />
            ))}
          </div>
          {/* LEFT column: text only */}
          <div>
            {noThumb.map((a,i) => (
              <ArticleRow key={i} title={a.title} thumb="" border={i>0} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ArticleRow({ title, thumb, border }: { title:string; thumb:string; border:boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        padding:'20px 24px',
        borderTop: border ? '1px solid rgba(255,255,255,0.05)' : 'none',
        gap:16,
        cursor:'pointer',
        background: hov ? 'rgba(255,255,255,0.02)' : 'transparent',
        transition:'background 0.2s',
      }}
    >
      <p style={{ fontSize:14, color:'#d9d9d9', lineHeight:1.5, flex:1 }}>{title}</p>
      {thumb && (
        <div style={{
          width:48, height:48, borderRadius:8, flexShrink:0,
          background:'rgba(255,255,255,0.06)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:20,
        }}>{thumb}</div>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════════════
   PODCAST / VIDEO
══════════════════════════════════════════════════════ */
function Podcast() {
  return (
    <section style={{ padding:'40px 0' }} dir="rtl">
      <div className="container">
        <div style={{
          background:'#171717', borderRadius:16,
          padding:'36px 40px',
          display:'flex', alignItems:'center', justifyContent:'space-between',
          flexWrap:'wrap', gap:24,
        }}>
          <div>
            <span style={{ fontSize:12, color:'rgba(255,255,255,0.25)', letterSpacing:1, display:'block', marginBottom:8 }}>البودكاست</span>
            <h3 style={{ fontSize:'clamp(18px,2vw,26px)', fontWeight:500, color:'#ededed', marginBottom:4 }}>
              استمع للبودكاست
            </h3>
            <p style={{ fontSize:14, color:'#888' }}>حلقات أسبوعيّة في بيع الخبرات والأعمال</p>
          </div>
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            {[
              { label:'YouTube', color:'#ff0000', icon:'▶' },
              { label:'Spotify', color:'#1DB954', icon:'♪' },
              { label:'Apple',   color:'#fc3c44', icon:'🎙' },
            ].map(p => (
              <a key={p.label} href="#" style={{
                display:'flex', alignItems:'center', gap:6,
                padding:'8px 16px', borderRadius:20,
                border:`1px solid ${p.color}33`,
                background:`${p.color}11`,
                fontSize:13, color:'#ededed',
                transition:'background 0.2s',
              }}
              onMouseEnter={e=>e.currentTarget.style.background=`${p.color}22`}
              onMouseLeave={e=>e.currentTarget.style.background=`${p.color}11`}
              >
                <span style={{ color:p.color }}>{p.icon}</span>
                {p.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   CTA SECTION — "تبحث عن خدماتي؟"
══════════════════════════════════════════════════════ */
function CTASection() {
  return (
    <section style={{ padding:'40px 0' }} dir="rtl">
      <div className="container">
        <div style={{
          background:'#171717', borderRadius:16,
          padding:'44px 48px',
          textAlign:'right',
        }}>
          <h2 style={{ fontSize:'clamp(22px,2.5vw,36px)', fontWeight:500, color:'#ededed', marginBottom:16 }}>
            تبحث عن خدماتي؟
          </h2>
          <p style={{ fontSize:15, color:'#888', lineHeight:1.8, marginBottom:32, maxWidth:560 }}>
            ومستعد أن تستثمر فيه وتعمل مع الأفضل؟ فرق شاسع ما بين بناء المشروع مع مرشد خبير وبين العمل وحدك
          </p>
          <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
            <a href="#" style={{
              padding:'12px 28px', borderRadius:20,
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
              fontSize:14, color:'#ededed', transition:'background 0.2s',
            }}>تواصل معي</a>
            <a href="#" style={{
              padding:'12px 28px', borderRadius:20,
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
              fontSize:14, color:'#ededed', transition:'background 0.2s',
            }}>الخدمات والباقات</a>
            <a href="#" style={{
              padding:'12px 28px', borderRadius:20,
              background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)',
              fontSize:14, color:'#ededed', transition:'background 0.2s',
            }}>جميع الحلقات</a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ══════════════════════════════════════════════════════
   FOOTER / NEWSLETTER
══════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ paddingTop:40, paddingBottom:48 }} dir="rtl">
      <div className="container">
        {/* Newsletter */}
        <div style={{ marginBottom:48, textAlign:'right' }}>
          <h3 style={{ fontSize:'clamp(20px,2vw,28px)', fontWeight:500, color:'#ededed', lineHeight:1.4, marginBottom:28 }}>
            أحدث مقالاتي<br />مباشرة في بريدك الالكتروني
          </h3>
          <div style={{ display:'flex', gap:10, maxWidth:480 }}>
            <button style={{
              background:'#2151ff', border:'none', borderRadius:10,
              padding:'12px 24px', fontSize:14, fontWeight:500,
              color:'#fff', cursor:'pointer', fontFamily:'inherit', flexShrink:0,
            }}>اشترك</button>
            <input
              type="email"
              placeholder="hala@moedesigns.io"
              style={{
                flex:1, background:'rgba(255,255,255,0.05)',
                border:'1px solid rgba(255,255,255,0.08)',
                borderRadius:10, padding:'12px 16px',
                fontSize:14, color:'#d9d9d9',
                fontFamily:'inherit', outline:'none', direction:'rtl',
              }}
            />
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop:'1px solid rgba(255,255,255,0.06)',
          paddingTop:24,
          display:'flex', alignItems:'center', justifyContent:'center', flexWrap:'wrap',
          gap:8, fontSize:14, color:'rgba(255,255,255,0.25)',
        }}>
          {['Bali / Dubai','hala@moedesigns.io','نشرة','احجز استشارة 💤'].map((item, i, arr) => (
            <span key={item} style={{ display:'flex', alignItems:'center', gap:8 }}>
              <a href="#" style={{ color:'rgba(255,255,255,0.25)', transition:'color 0.2s' }}
              onMouseEnter={e=>e.currentTarget.style.color='rgba(255,255,255,0.6)'}
              onMouseLeave={e=>e.currentTarget.style.color='rgba(255,255,255,0.25)'}
              >{item}</a>
              {i < arr.length-1 && <span>·</span>}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ══════════════════════════════════════════════════════
   PAGE
══════════════════════════════════════════════════════ */
export default function Page() {
  return (
    <div style={{ background:'#0f0f0f', minHeight:'100vh' }} dir="rtl">
      <Navbar />
      <Hero />
      <Portfolio />
      <Stats />
      <Clients />
      <NashraSection />
      <Products />
      <ServicesPills />
      <Articles />
      <Podcast />
      <CTASection />
      <Footer />
    </div>
  )
}
