import { NextResponse } from 'next/server';
import robots from '@/app/robots';

export async function GET() {
  try {
    const robotsData = robots();
    
    // Convertir a texto plano
    let robotsTxt = '';
    
    (robotsData.rules as any[]).forEach((rule: any) => {
      robotsTxt += `User-agent: ${rule.userAgent}\n`;
      
      if (rule.allow) {
        const allowPaths = Array.isArray(rule.allow) ? rule.allow : [rule.allow];
        allowPaths.forEach((path: string) => {
          robotsTxt += `Allow: ${path}\n`;
        });
      }
      
      if (rule.disallow) {
        const disallowPaths = Array.isArray(rule.disallow) ? rule.disallow : [rule.disallow];
        disallowPaths.forEach((path: string) => {
          robotsTxt += `Disallow: ${path}\n`;
        });
      }
      
      robotsTxt += '\n';
    });
    
    if (robotsData.sitemap) {
      robotsTxt += `Sitemap: ${robotsData.sitemap}\n`;
    }
    
    if (robotsData.host) {
      robotsTxt += `Host: ${robotsData.host}\n`;
    }

    return new NextResponse(robotsTxt, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating robots.txt:', error);
    return new NextResponse('Error generating robots.txt', { status: 500 });
  }
}
