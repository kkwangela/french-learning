const CACHE_NAME = 'woyaoqubali-cache-v15';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/styles.css?v=15',
  './js/i18n.js?v=15',
  './js/data.js?v=15',
  './js/srs.js?v=15',
  './js/audio.js?v=15',
  './js/wordtooltip.js?v=15',
  './js/dictionary.js?v=15',
  './js/app.js?v=15',
  './assets/favicon.png',
  './assets/apple-touch-icon.png',
  './assets/icon-192.png',
  './assets/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch(() => {});
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Network-First with HTTP cache bypass ('reload') so new GitHub Pages deploys
// appear immediately without stale JS/CSS caches, falling back to cache offline.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    fetch(event.request, { cache: 'reload' })
      .then((networkResponse) => {
        if (networkResponse && networkResponse.ok) {
          const copy = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
