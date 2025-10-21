const CACHE_VERSION = 'v2';
const CACHE_NAME = `bdj-remixer-${CACHE_VERSION}`;
const RUNTIME_CACHE = `bdj-remixer-runtime-${CACHE_VERSION}`;
const IMAGE_CACHE = `bdj-remixer-images-${CACHE_VERSION}`;
const AUDIO_CACHE = `bdj-remixer-audio-${CACHE_VERSION}`;

// Recursos críticos para precachear
const PRECACHE_URLS = [
  '/',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/BDJ-FLYER.png',
  '/LOGO.png',
  '/LOGO_RECORTADO.png'
];

// Tiempos de caché
const CACHE_EXPIRATION = {
  images: 30 * 24 * 60 * 60 * 1000, // 30 días
  audio: 7 * 24 * 60 * 60 * 1000,   // 7 días
  runtime: 24 * 60 * 60 * 1000      // 1 día
};

// Install event - precachear recursos críticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(PRECACHE_URLS).catch((error) => {
          console.error('Error al precachear recursos:', error);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - limpiar cachés antiguos
self.addEventListener('activate', (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, IMAGE_CACHE, AUDIO_CACHE];
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => !currentCaches.includes(cacheName))
            .map((cacheName) => caches.delete(cacheName))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Función para verificar si la caché está expirada
function isCacheExpired(cachedResponse, maxAge) {
  if (!cachedResponse) return true;
  
  const dateHeader = cachedResponse.headers.get('date');
  if (!dateHeader) return false;
  
  const cachedDate = new Date(dateHeader).getTime();
  const now = Date.now();
  
  return (now - cachedDate) > maxAge;
}

// Estrategia Cache First (con actualización en background)
async function cacheFirst(request, cacheName, maxAge) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse && !isCacheExpired(cachedResponse, maxAge)) {
    // Actualizar en background si es necesario
    fetch(request)
      .then((response) => {
        if (response && response.status === 200) {
          cache.put(request, response.clone());
        }
      })
      .catch(() => {});
    
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    // Si falla la red, devolver caché aunque esté expirada
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Estrategia Network First (con fallback a caché)
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 200) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Fetch event - enrutamiento de estrategias de caché
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Solo cachear GET requests
  if (request.method !== 'GET') return;
  
  // No cachear API requests (excepto algunas rutas específicas)
  if (url.pathname.startsWith('/api/')) {
    // API de Google Drive - Network First
    if (url.pathname.includes('/api/drive')) {
      event.respondWith(networkFirst(request, RUNTIME_CACHE));
    }
    return;
  }
  
  // Estrategias según tipo de recurso
  
  // Imágenes - Cache First con expiración larga
  if (request.destination === 'image' || 
      url.pathname.match(/\.(png|jpg|jpeg|svg|gif|webp|ico)$/i)) {
    event.respondWith(cacheFirst(request, IMAGE_CACHE, CACHE_EXPIRATION.images));
    return;
  }
  
  // Audio - Cache First con expiración media
  if (request.destination === 'audio' || 
      url.pathname.match(/\.(mp3|wav|ogg|m4a|aac|flac)$/i)) {
    event.respondWith(cacheFirst(request, AUDIO_CACHE, CACHE_EXPIRATION.audio));
    return;
  }
  
  // Scripts y estilos - Network First
  if (request.destination === 'script' || 
      request.destination === 'style' ||
      url.pathname.startsWith('/_next/')) {
    event.respondWith(networkFirst(request, RUNTIME_CACHE));
    return;
  }
  
  // Documentos HTML - Network First
  if (request.destination === 'document' || 
      request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirst(request, CACHE_NAME));
    return;
  }
  
  // Manifest y otros recursos - Cache First
  if (url.pathname.includes('manifest') || 
      url.pathname.includes('/icons/')) {
    event.respondWith(cacheFirst(request, CACHE_NAME, CACHE_EXPIRATION.images));
    return;
  }
  
  // Resto de recursos - Cache First con expiración corta
  event.respondWith(cacheFirst(request, RUNTIME_CACHE, CACHE_EXPIRATION.runtime));
});

// Message event - control manual de caché
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
      })
    );
  }
});

// Sync event - para sincronización en background
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Aquí puedes agregar lógica de sincronización
      Promise.resolve()
    );
  }
});


