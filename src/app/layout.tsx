import type { Metadata } from 'next'
import './globals.css'

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {children}
      </body>
    </html>
  )
}
