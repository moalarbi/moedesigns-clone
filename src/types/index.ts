// Portfolio/Works
export interface PortfolioProject {
  id: string
  title: string
  category: 'موقع تجاري' | 'منصّة تدريبيّة'
  image: string
  link: string
  backgroundColor?: string
}

// Products/Courses
export interface Product {
  id: string
  title: string
  price: number
  currency: 'USD' | 'SAR'
  type: 'دورة مسجّلة' | 'دورة رقميّة' | 'كتيّب رقمي' | 'ورشة'
  image: string
  link: string
}

// Blog Articles
export interface BlogArticle {
  id: string
  title: string
  slug: string
  link: string
}

// Service Categories
export interface ServiceCategory {
  id: string
  name: string
  slug: string
  link: string
}

// Video Content
export interface VideoContent {
  id: string
  title: string
  thumbnail: string
  videoId: string // YouTube video ID
  link: string
}

// Client/Logo
export interface ClientLogo {
  id: string
  name: string
  image: string
  link?: string
}

// Navigation Link
export interface NavLink {
  label: string
  href: string
  external?: boolean
}

// Hero Card
export interface HeroCard {
  id: string
  label: string
  title: string
  description: string
  link: string
  isActive?: boolean
}

// Page Metadata
export interface PageMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}
