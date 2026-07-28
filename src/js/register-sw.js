// Реєстрація Service Worker для офлайн-роботи додатку.
// Використовуємо синтаксис new URL(...) — Parcel 2 розпізнає його
// і сам збирає sw.js в окремий бандл з правильним хешем/шляхом.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register(new URL('../sw.js', import.meta.url), { type: 'module', scope: './' })
      .catch((err) => console.warn('[SW] Реєстрація не вдалась:', err));
  });
}