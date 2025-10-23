import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';

export async function GET() {
  try {
    const sitemapData = sitemap();
    
    // Convertir a XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${sitemapData.map(item => `  <url>
        <loc>${item.url}</loc>
        <lastmod>${item.lastModified ? (typeof item.lastModified === 'string' ? item.lastModified : item.lastModified.toISOString()) : new Date().toISOString()}</lastmod>
        <changefreq>${item.changeFrequency}</changefreq>
        <priority>${item.priority}</priority>
      </url>`).join('\n')}
    </urlset>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
