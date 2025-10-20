import type { MetadataRoute } from 'next'

// Next.js App Router: manifest as a function
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: '/',
    name: 'BDJ Remixer',
    short_name: 'BDJ Remixer',
    description: 'Música para DJs: remixes, pistas, beats y sets.',
    lang: 'es',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#0b1020',
    theme_color: '#1e40af',
    icons: [
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
      { src: '/favicon.ico', sizes: '48x48', type: 'image/x-icon' }
    ]
  }
}


