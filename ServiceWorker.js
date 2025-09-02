const cacheName = "DefaultCompany-My project-1.0";
const contentToCache = [
    "Build/f5b63b7c68733ee98df217b2cfcc2550.loader.js",
    "Build/79f1647bdbc9ea3cc3418a3b86614b0c.framework.js",
    "Build/6de0e888727f0f6bb10dfe0f948f3300.data",
    "Build/a7624d6a54ff9dbef135031d6bc9463a.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
