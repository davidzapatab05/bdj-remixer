// app/layout.tsx
import './globals.css'; // asegúrate de tener Tailwind configurado
import ThemeProviders from '@/components/ThemeProvider';
import StructuredData from '@/components/StructuredData';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'BDJ Remixer - Acceso a Unidades Compartidas de Google Drive',
    template: '%s | BDJ Remixer'
  },
  description: 'Accede a unidades compartidas de Google Drive sin necesidad de login. Explora archivos, carpetas y contenido de BDJ Remixer de forma segura y rápida.',
  keywords: [
    'BDJ Remixer',
    'Google Drive',
    'unidades compartidas',
    'acceso sin login',
    'explorador de archivos',
    'compartir archivos',
    'drive compartido',
    'acceso público',
    'navegación de carpetas',
    'búsqueda de archivos'
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
    title: 'BDJ Remixer - Acceso a Unidades Compartidas de Google Drive',
    description: 'Accede a unidades compartidas de Google Drive sin necesidad de login. Explora archivos, carpetas y contenido de BDJ Remixer de forma segura y rápida.',
    siteName: 'BDJ Remixer',
    images: [
      {
        url: '/BDJ-FLYER.png',
        width: 1200,
        height: 630,
        alt: 'BDJ Remixer - Acceso a Unidades Compartidas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BDJ Remixer - Acceso a Unidades Compartidas de Google Drive',
    description: 'Accede a unidades compartidas de Google Drive sin necesidad de login. Explora archivos, carpetas y contenido de BDJ Remixer de forma segura y rápida.',
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
  verification: {
    google: 'your-google-verification-code', // Reemplaza con tu código de verificación de Google
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <StructuredData />
        <link rel="canonical" href={process.env.BASE_URL || 'http://localhost:3000'} />
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
      </body>
    </html>
  );
}
