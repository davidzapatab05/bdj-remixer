import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BDJ Remixer',
    short_name: 'BDJ Remixer',
    description: 'Remixes y pistas para DJs. Explora y busca contenido compartido.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111827',
    theme_color: '#1e40af',
    lang: 'es',
    icons: [
      {
        src: '/LOGO_RECORTADO.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/LOGO.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      }
    ]
  };
}


