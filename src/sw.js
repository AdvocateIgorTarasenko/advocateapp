// Service Worker: Адвокат Тарасенко — offline app shell
// Стратегія: precache усіх 18 сторінок сайту + favicon/manifest під час install,
// а всі інші same-origin GET-запити (css/js/img/fonts) кешуються "на льоту"
// за стратегією stale-while-revalidate під час перегляду.
// PHP-обробники (mail.php, phpmailer) НІКОЛИ не кешуються — форми потребують мережі.

const VERSION = 'v1';
const CACHE_NAME = `advocate-shell-${VERSION}`;

const PRECACHE_URLS = [
  './',
  './index.html',
  './aboutme.html',
  './administrative-law.html',
  './automotive-law.html',
  './business-law.html',
  './cases.html',
  './civil-law.html',
  './contacts.html',
  './criminal-law.html',
  './debt-recovery.html',
  './debtor-protection.html',
  './fintech.html',
  './intellectual-property.html',
  './labor-law.html',
  './migration-services.html',
  './military-law.html',
  './military-lawyer.html',
  './tax-law.html',
  './favicon/site.webmanifest',
  './favicon/favicon-32x32.png',
  './favicon/favicon-16x16.png',
  './favicon/apple-touch-icon.png',
  './favicon/android-chrome-192x192.png',
  './favicon/android-chrome-512x512.png',
];

// Запити, які ніколи не можна кешувати (відправка форм і т.п.)
const NEVER_CACHE = [/mail\.php/i, /phpmailer/i];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch((err) => {
        console.warn('[SW] precache: частина ресурсів не завантажена', err);
      })
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key.startsWith('advocate-shell-') && key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

function isNeverCache(url) {
  return NEVER_CACHE.some((re) => re.test(url));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  if (isNeverCache(url.pathname)) return;

  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(request).then((cached) => {
        const network = fetch(request)
          .then((response) => {
            if (response && response.status === 200) {
              cache.put(request, response.clone());
            }
            return response;
          })
          .catch(() => cached);
        return cached || network;
      })
    )
  );
});