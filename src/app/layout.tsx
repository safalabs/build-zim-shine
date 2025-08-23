import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Visionary Property Development - Equity Crowdfunding Platform Zimbabwe',
  description: 'Invest in Zimbabwe\'s premier property developments through equity-based crowdfunding. Join 2500+ investors earning 25% average returns with Africa\'s largest construction consortium.',
  keywords: 'Zimbabwe property investment, crowdfunding, real estate, equity investment, property development, construction, Harare, Bulawayo',
  authors: [{ name: 'Visionary Property Development' }],
  openGraph: {
    title: 'Visionary Property Development - Equity Crowdfunding Platform Zimbabwe',
    description: 'Invest in Zimbabwe\'s premier property developments through equity-based crowdfunding. Join 2500+ investors earning 25% average returns.',
    type: 'website',
    images: [
      {
        url: 'https://lovable.dev/opengraph-image-p98pqg.png',
        alt: 'Visionary Property Development'
      }
    ],
    url: 'https://visionarydev.co.zw',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@lovable_dev',
    images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
  },
  alternates: {
    canonical: 'https://visionarydev.co.zw',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}