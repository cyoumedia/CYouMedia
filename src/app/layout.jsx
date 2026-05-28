import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'CYouMedia - AI Visibility & GEO Optimisation',
  description:
    'Global strategic partner combining business development with digital visibility.',
  openGraph: {
    title: 'CYouMedia - AI Visibility & GEO Optimisation',
    description: 'Global strategic partner combining business development with digital visibility.',
    images: [
      {
        url: 'https://cyoumedia.com/full_logi.png',
        width: 800,
        height: 600,
        alt: 'CYouMedia Logo',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-300 font-sans selection:bg-teal-500/30">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CYouMedia",
              "url": "https://cyoumedia.com",
              "logo": "https://cyoumedia.com/full_logi.png",
              "description": "Global strategic partner combining business development with digital visibility, AI search optimization, and reputation management.",
              "sameAs": [
                "https://www.linkedin.com/company/cyoumedia",
                "https://github.com/cyoumedia"
              ]
            })
          }}
        />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}