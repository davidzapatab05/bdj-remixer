// components/StructuredData.tsx
import Script from 'next/script';

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MusicGroup",
    "name": "BDJ Remixer",
    "description": "Descarga música exclusiva para DJs: remixes, pistas, beats y sets. BDJ Remixer ofrece la mejor colección de música electrónica, reggaeton, trap y más para profesionales del DJ.",
    "url": process.env.BASE_URL || 'http://localhost:3000',
    "genre": [
      "Electronic Music",
      "Reggaeton",
      "Trap",
      "Dance Music",
      "Club Music",
      "Party Music"
    ],
    "sameAs": [
      "https://www.tiktok.com/@bdjremixeroficial"
    ],
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "MusicAlbum",
        "name": "BDJ Remixer - Colección de Música para DJs",
        "description": "Remixes exclusivos, pistas DJ, beats y sets para profesionales"
      },
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
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
      "Música exclusiva para DJs",
      "Remixes originales",
      "Pistas de alta calidad",
      "Beats profesionales",
      "Sets DJ completos",
      "Música electrónica",
      "Reggaeton remix",
      "Trap beats",
      "Música club",
      "Pistas de baile"
    ],
    "screenshot": {
      "@type": "ImageObject",
      "url": "/BDJ-FLYER.png",
      "width": 1200,
      "height": 630
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+51-945-270-604",
      "contactType": "customer service",
      "availableLanguage": "Spanish"
    },
    "keywords": "música DJ, remixes, beats, música electrónica, reggaeton, trap, club music, party music, DJ music, electronic music"
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
