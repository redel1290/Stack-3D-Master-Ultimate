const CACHE_NAME = 'stack-3d-v1';
// Список ресурсів для кешування (твій єдиний файл та іконка)
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './icon-512.png',
  './manifest.json'
];

// 1. Подія "install": завантажуємо файли в пам'ять при першому візиті
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Кешування ресурсів...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Подія "activate": очищуємо старий кеш, якщо ти оновив гру
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// 3. Подія "fetch": перехоплюємо запити. 
// Якщо файл є в кеші — віддаємо миттєво. Якщо немає — йдемо в інтернет.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
