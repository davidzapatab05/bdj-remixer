const CACHE_NAME = 'bdj-remixer-v1';
const CORE_ASSETS = ['/', '/favicon.ico', '/LOGO.png', '/LOGO_RECORTADO.png', '/BDJ-FLYER.png'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const networkResponse = await fetch(request);
        const copy = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {});
        return networkResponse;
      } catch (e) {
        const fallback = await caches.match('/');
        if (fallback) return fallback;
        throw e;
      }
    })()
  );
});

"use strict";(()=>{var c=self,r="bdj-remixer-v1",o=["/","/favicon.ico","/LOGO.png","/LOGO_RECORTADO.png","/BDJ-FLYER.png"];c.addEventListener("install",t=>{t.waitUntil(caches.open(r).then(e=>e.addAll(o)).then(()=>c.skipWaiting()))});c.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(e=>Promise.all(e.filter(n=>n!==r).map(n=>caches.delete(n)))).then(()=>c.clients.claim()))});c.addEventListener("fetch",t=>{let e=t.request;e.method==="GET"&&t.respondWith((async()=>{let n=await caches.match(e);if(n)return n;try{let a=await fetch(e),s=a.clone();return caches.open(r).then(i=>i.put(e,s)).catch(()=>{}),a}catch{let a=await caches.match(e);if(a)return a;throw new Error("Network error and no cache available")}})())});})();
