/* 麦麦的工作台 - Service Worker v5.2 */
const CACHE = 'maimai-v5.2-' + Date.now();
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-1024.png',
  './assets/dimoo-home.png',
  './assets/dimoo-plan.png',
  './assets/dimoo-diet.png',
  './assets/dimoo-uplift.png',
  './assets/dimoo-exam.png',
  './assets/dimoo-english.png',
  './assets/dimoo-exercise.png',
  './assets/dimoo-lesson.png',
  './assets/dimoo-soup.png',
  './assets/dimoo-books.png',
  './assets/dimoo-chest.png',
  './assets/dimoo-splash.png',
  './assets/starr.png',
  './assets/star-deco.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        if (resp && resp.status === 200) {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      }).catch(() => cached);
    })
  );
});
