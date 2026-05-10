import type { Metadata } from 'next'
import { IBM_Plex_Sans_Arabic } from 'next/font/google'
import './globals.css'

const font = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300','400','500','600','700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'محمّد الحكيم - مستشار في بيع الخبرات',
  description: 'مستشار في بناء المشاريع الاستشاريّة والتدريبيّة. رائد أعمال وكاتب.',
  openGraph: {
    type:'website', locale:'ar_SA', url:'https://moedesigns.io',
    title:'محمّد الحكيم - مستشار في بيع الخبرات',
    description:'مستشار في بناء المشاريع الاستشاريّة والتدريبيّة. رائد أعمال وكاتب.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <body className={font.className}>{children}</body>
    </html>
  )
}
