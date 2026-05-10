import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'محمّد الحكيم - مستشار في بيع الخبرات',
  description: 'مستشار في بناء المشاريع الاستشاريّة والتدريبيّة. رائد أعمال وكاتب.',
  openGraph: {
    type: 'website',
    locale: 'ar_SA',
    url: 'https://moedesigns.io',
    title: 'محمّد الحكيم - مستشار في بيع الخبرات',
    description: 'مستشار في بناء المشاريع الاستشاريّة والتدريبيّة. رائد أعمال وكاتب.',
  },
  twitter: {
    card: 'summary',
    title: 'محمّد الحكيم - مستشار في بيع الخبرات',
    description: 'مستشار في بناء المشاريع الاستشاريّة والتدريبيّة. رائد أعمال وكاتب.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexArabic.variable}>
      <body className={`${ibmPlexArabic.className} bg-background text-text-primary antialiased`}>
        {children}
      </body>
    </html>
  )
}
