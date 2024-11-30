// This is a simple service worker that caches essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('smoothgressi-cache').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/logo.png',
        '/manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
