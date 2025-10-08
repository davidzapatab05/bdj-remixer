// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/', '/admin/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
