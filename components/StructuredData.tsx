// components/StructuredData.tsx
import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BDJ Remixer",
    "description": "Accede a unidades compartidas de Google Drive sin necesidad de login. Explora archivos, carpetas y contenido de BDJ Remixer de forma segura y rápida.",
    "url": process.env.BASE_URL || 'http://localhost:3000',
    "applicationCategory": "WebApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Organization",
      "name": "BDJ Remixer",
      "url": "https://www.tiktok.com/@bdjremixeroficial",
      "sameAs": [
        "https://www.tiktok.com/@bdjremixeroficial"
      ]
    },
    "featureList": [
      "Acceso sin login a Google Drive",
      "Navegación por carpetas",
      "Búsqueda en tiempo real",
      "Interfaz responsiva",
      "Integración con WhatsApp"
    ],
    "screenshot": {
      "@type": "ImageObject",
      "url": "/BDJ-FLYER.png",
      "width": 1200,
      "height": 630
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+51-945-227-780",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    }
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
