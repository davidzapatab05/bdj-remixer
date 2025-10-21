import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas',
    short_name: 'BDJ Remixer',
    description: 'Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.',
    start_url: '/?source=pwa',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    background_color: '#111827',
    theme_color: '#1e40af',
    lang: 'es',
    dir: 'ltr',
    categories: ['music', 'entertainment', 'audio'],
    shortcuts: [
      {
        name: 'Buscar Música DJ',
        short_name: 'Buscar',
        description: 'Buscar música y remixes para DJs',
        url: '/?action=search',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
      },
      {
        name: 'Remixes Exclusivos',
        short_name: 'Remixes',
        description: 'Explorar remixes exclusivos',
        url: '/#remixes',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
      },
      {
        name: 'Contacto WhatsApp',
        short_name: 'Contacto',
        description: 'Contactar por WhatsApp',
        url: '/?action=whatsapp',
        icons: [{ src: '/icons/icon-192.png', sizes: '192x192' }]
      }
    ],
    icons: [
      { 
        src: '/favicon.ico', 
        sizes: '48x48', 
        type: 'image/x-icon',
        purpose: 'any'
      },
      { 
        src: '/icons/icon-192.png', 
        sizes: '192x192', 
        type: 'image/png', 
        purpose: 'any'
      },
      { 
        src: '/icons/icon-192.png', 
        sizes: '192x192', 
        type: 'image/png', 
        purpose: 'maskable'
      },
      { 
        src: '/icons/icon-512.png', 
        sizes: '512x512', 
        type: 'image/png', 
        purpose: 'any'
      },
      { 
        src: '/icons/icon-512.png', 
        sizes: '512x512', 
        type: 'image/png', 
        purpose: 'maskable'
      }
    ],
    screenshots: [
      {
        src: '/BDJ-FLYER.png',
        sizes: '1200x630',
        type: 'image/png',
        form_factor: 'wide',
        label: 'Vista principal de BDJ Remixer'
      }
    ]
  };
}


