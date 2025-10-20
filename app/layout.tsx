// app/layout.tsx
import './globals.css'; // asegúrate de tener Tailwind configurado
import ThemeProviders from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';
import type { Metadata } from 'next';
import SwRegister from '@/components/SwRegister';

export const metadata: Metadata = {
  applicationName: 'BDJ Remixer',
  title: {
    default: 'BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas',
    template: '%s | BDJ Remixer - Música para DJs'
  },
  description: 'Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.',
  keywords: [
    'música para DJs',
    'remixes exclusivos',
    'pistas DJ',
    'música electrónica',
    'reggaeton remix',
    'trap beats',
    'música DJ profesional',
    'sets DJ',
    'BDJ Remixer',
    'descargar música DJ',
    'beats exclusivos',
    'música club',
    'pistas de baile',
    'remixes originales',
    'música fiesta',
    'DJ music',
    'electronic music',
    'dance music',
    'party music',
    'club music'
  ],
  authors: [{ name: 'BDJ Remixer' }],
  creator: 'BDJ Remixer',
  publisher: 'BDJ Remixer',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: '/',
    title: 'BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas',
    description: 'Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.',
    siteName: 'BDJ Remixer - Música para DJs',
    images: [
      {
        url: '/BDJ-FLYER.png',
        width: 1200,
        height: 630,
        alt: 'BDJ Remixer - Música para DJs, Remixes y Pistas Exclusivas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas',
    description: 'Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.',
    images: ['/BDJ-FLYER.png'],
    creator: '@bdjremixeroficial',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // Icons for browsers and search engines
  icons: {
    icon: [
      { url: '/favicon.ico', rel: 'icon', type: 'image/x-icon', sizes: '16x16 32x32 48x48' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/LOGO_RECORTADO.png', sizes: '180x180' },
    ],
  },
  manifest: '/manifest.webmanifest',
  verification: {
    google: 'G1oKjRa4UD5EXuvruOJTJxoKUAqhijjc-j8ZJsgTE6s',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="canonical" href={process.env.BASE_URL || 'http://localhost:3000'} />
        {/* Favicons e iconos explícitos */}
        <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <meta name="theme-color" content="#1e40af" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>
        <ThemeProviders>
          <main className="min-h-screen text-gray-900 dark:text-gray-100">
            {children}
          </main>
        </ThemeProviders>
        <SwRegister />
      </body>
    </html>
  );
}
