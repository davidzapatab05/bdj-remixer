// app/layout.tsx
import './globals.css'; // asegúrate de tener Tailwind configurado
import ThemeProviders from '@/components/ThemeProvider';
import SwRegister from '@/components/SwRegister';
import StructuredData from '@/components/StructuredData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas',
    template: '%s | BDJ Remixer - Música para DJs'
  },
  description: 'Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.',
  applicationName: 'BDJ Remixer',
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
    'club music',
    'house music',
    'techno',
    'EDM',
    'dubstep',
    'bass music',
    'DJ tracks',
    'DJ tools',
    'professional DJ',
    'live sets',
    'mixtapes',
    'DJ performance',
    'música latina',
    'latin music',
    'urbano',
    'perreo',
    'dembow'
  ],
  authors: [{ name: 'BDJ Remixer', url: 'https://www.tiktok.com/@bdjremixeroficial' }],
  creator: 'BDJ Remixer',
  publisher: 'BDJ Remixer',
  category: 'Music',
  classification: 'Music & Entertainment',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.BASE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
    languages: {
      'es': '/',
      'es-ES': '/',
      'es-MX': '/',
      'es-AR': '/',
      'es-CO': '/',
      'es-PE': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    alternateLocale: ['es_MX', 'es_AR', 'es_CO', 'es_PE'],
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
        type: 'image/png',
      },
      {
        url: '/LOGO.png',
        width: 512,
        height: 512,
        alt: 'BDJ Remixer Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@bdjremixeroficial',
    title: 'BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas',
    description: 'Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.',
    images: ['/BDJ-FLYER.png'],
    creator: '@bdjremixeroficial',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: ['/favicon.ico'],
    apple: [
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/icons/icon-192.png',
      },
    ],
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'BDJ Remixer',
    statusBarStyle: 'black-translucent',
    startupImage: [
      {
        url: '/LOGO.png',
        media: '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/LOGO.png',
        media: '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      {
        url: '/LOGO.png',
        media: '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },
  verification: {
    google: 'G1oKjRa4UD5EXuvruOJTJxoKUAqhijjc-j8ZJsgTE6s',
    yandex: 'yandex-verification',
    yahoo: 'yahoo-verification',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'BDJ Remixer',
    'application-name': 'BDJ Remixer',
    'msapplication-TileColor': '#1e40af',
    'msapplication-TileImage': '/icons/icon-512.png',
    'msapplication-config': 'none',
    'format-detection': 'telephone=no',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  
  return (
    <html lang="es" dir="ltr">
      <head>
        <StructuredData />
        
        {/* Canonical & Manifest */}
        <link rel="canonical" href={baseUrl} />
        <link rel="manifest" href="/manifest.webmanifest" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* PWA & Mobile Meta Tags */}
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#1e40af" media="(prefers-color-scheme: dark)" />
        <meta name="msapplication-TileColor" content="#1e40af" />
        <meta name="msapplication-TileImage" content="/icons/icon-512.png" />
        <meta name="msapplication-navbutton-color" content="#1e40af" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BDJ Remixer" />
        <meta name="mobile-web-app-capable" content="yes" />
        
        {/* Viewport & Device Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes, viewport-fit=cover" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
        <link rel="apple-touch-startup-image" href="/LOGO.png" />
        
        {/* Language & Location */}
        <meta httpEquiv="content-language" content="es" />
        <meta name="language" content="Spanish" />
        <meta name="geo.region" content="PE" />
        <meta name="geo.placename" content="Peru" />
        
        {/* Dublin Core Metadata */}
        <meta name="DC.title" content="BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas" />
        <meta name="DC.creator" content="BDJ Remixer" />
        <meta name="DC.subject" content="Música DJ, Remixes, Beats, Música Electrónica" />
        <meta name="DC.description" content="Descarga música exclusiva para DJs: remixes, pistas, beats y sets." />
        <meta name="DC.publisher" content="BDJ Remixer" />
        <meta name="DC.contributor" content="BDJ Remixer" />
        <meta name="DC.type" content="Interactive Resource" />
        <meta name="DC.format" content="text/html" />
        <meta name="DC.language" content="es" />
        
        {/* Social Media & Rich Previews */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="BDJ Remixer" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Additional SEO Tags */}
        <meta name="rating" content="general" />
        <meta name="distribution" content="global" />
        <meta name="revisit-after" content="1 days" />
        <meta name="audience" content="all" />
        <meta name="coverage" content="Worldwide" />
        <meta name="target" content="all" />
        <meta name="referrer" content="origin-when-cross-origin" />
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
