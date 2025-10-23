// components/StructuredData.tsx
import Script from 'next/script';

export default function StructuredData() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';
  
  // Schema 1: Organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}#organization`,
    "name": "BDJ Remixer",
    "legalName": "BDJ Remixer",
    "url": baseUrl,
    "logo": {
      "@type": "ImageObject",
      "url": `${baseUrl}/LOGO.png`,
      "width": 512,
      "height": 512,
      "caption": "BDJ Remixer Logo"
    },
    "description": "Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.",
    "sameAs": [
      "https://www.tiktok.com/@bdjremixeroficial"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+51-945-270-604",
      "contactType": "customer service",
      "availableLanguage": ["Spanish", "English"],
      "areaServed": "Worldwide"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "PE",
      "addressLocality": "Peru"
    }
  };

  // Schema 2: WebSite
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}#website`,
    "url": baseUrl,
    "name": "BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas",
    "description": "Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.",
    "publisher": {
      "@id": `${baseUrl}#organization`
    },
    "inLanguage": "es",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Schema 3: WebPage
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${baseUrl}#webpage`,
    "url": baseUrl,
    "name": "BDJ Remixer - Música para DJs | Remixes y Pistas Exclusivas",
    "description": "Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.",
    "isPartOf": {
      "@id": `${baseUrl}#website`
    },
    "about": {
      "@id": `${baseUrl}#organization`
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": `${baseUrl}/BDJ-FLYER.png`,
      "width": 1200,
      "height": 630
    },
    "datePublished": "2024-01-01T00:00:00+00:00",
    "dateModified": new Date().toISOString(),
    "inLanguage": "es"
  };

  // Schema 4: WebApplication
  const webApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "BDJ Remixer",
    "url": baseUrl,
    "description": "Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.",
    "applicationCategory": "MultimediaApplication",
    "applicationSubCategory": "Music",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Música exclusiva para DJs",
      "Remixes originales y pistas profesionales",
      "Beats de alta calidad",
      "Sets DJ completos",
      "Música electrónica, reggaeton, trap",
      "Descarga rápida y fácil",
      "Búsqueda avanzada de música",
      "Navegación por carpetas",
      "Reproducción de audio integrada",
      "Compatible con todos los dispositivos"
    ],
    "screenshot": {
      "@type": "ImageObject",
      "url": `${baseUrl}/BDJ-FLYER.png`,
      "width": 1200,
      "height": 630
    }
  };

  // Schema 5: MusicGroup
  const musicGroupSchema = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "BDJ Remixer",
    "url": baseUrl,
    "description": "Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.",
    "genre": [
      "Electronic Music",
      "Reggaeton",
      "Trap",
      "House Music",
      "Techno",
      "EDM",
      "Dance Music",
      "Club Music",
      "Party Music",
      "Latin Music",
      "Urbano",
      "Dembow"
    ],
    "sameAs": [
      "https://www.tiktok.com/@bdjremixeroficial"
    ],
    "image": {
      "@type": "ImageObject",
      "url": `${baseUrl}/LOGO.png`,
      "width": 512,
      "height": 512
    }
  };

  // Schema 6: BreadcrumbList - Solo página principal
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "BDJ Remixer - Música para DJs",
        "item": baseUrl
      }
    ]
  };

  // Schema 7: FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Qué es BDJ Remixer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BDJ Remixer es una plataforma que ofrece música exclusiva para DJs, incluyendo remixes, pistas, beats y sets profesionales de música electrónica, reggaeton, trap y más géneros."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué tipo de música puedo encontrar?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En BDJ Remixer encontrarás una amplia colección de música para DJs: remixes exclusivos, pistas de música electrónica, reggaeton, trap, house, techno, EDM, club music, party music y más géneros urbanos y latinos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Es gratuito usar BDJ Remixer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, BDJ Remixer ofrece acceso gratuito a su colección de música para DJs. Puedes explorar, buscar y descargar contenido de manera gratuita."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cómo puedo contactar con BDJ Remixer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Puedes contactarnos por WhatsApp al +51-945-270-604 o seguirnos en TikTok @bdjremixeroficial para estar al día con las últimas novedades."
        }
      }
    ]
  };

  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    websiteSchema,
    webPageSchema,
    webApplicationSchema,
    musicGroupSchema,
    breadcrumbSchema,
    faqSchema
  ];

  return (
    <>
      {allSchemas.map((schema, index) => (
        <Script
          key={`structured-data-${index}`}
          id={`structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema),
          }}
        />
      ))}
    </>
  );
}
