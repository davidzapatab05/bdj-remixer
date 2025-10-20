const CACHE_NAME = 'bdj-remixer-v1';
const PRECACHE_URLS = [
  '/',
  '/BDJ-FLYER.png',
  '/LOGO.png',
  '/LOGO_RECORTADO.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.map((k) => (k === CACHE_NAME ? undefined : caches.delete(k))))
    )
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  // Estrategia: cache-first para recursos GET; red para API de Drive
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.pathname.startsWith('/api/')) return; // no cachear API

  event.respondWith(
    caches.match(request).then((cached) =>
      cached || fetch(request).then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
    )
  );
});


