// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/', '/api/sitemap', '/api/robots'],
        disallow: ['/api/drive', '/api/audio-demo', '/api/refresh-token', '/api/save-tokens', '/admin/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/_next/static/', '/api/sitemap', '/api/robots'],
        disallow: ['/api/drive', '/api/audio-demo', '/api/refresh-token', '/api/save-tokens', '/admin/'],
      },
      {
        userAgent: 'Bingbot',
        allow: ['/', '/_next/static/', '/api/sitemap', '/api/robots'],
        disallow: ['/api/drive', '/api/audio-demo', '/api/refresh-token', '/api/save-tokens', '/admin/'],
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
