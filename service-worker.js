const CACHE_NAME = 'insapa-v1';
const BASE = '/INSAPAapp/';

const urlsToCache = [
  BASE,
  BASE + 'index.html',
  BASE + 'contabilita.html',
  BASE + 'agenti.html',
  BASE + 'manifest.json',
  BASE + 'icons/icon-48.png',
  BASE + 'icons/icon-72.png',
  BASE + 'icons/icon-96.png',
  BASE + 'icons/icon-144.png',
  BASE + 'icons/icon-192.png',
  BASE + 'icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aperta');
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Errore cache:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
