/**
 * Daily Companion Service Worker
 * 缓存核心资源，支持离线访问
 */

const CACHE_NAME = 'daily-companion-v9';
const urlsToCache = [
  '/daily-companion/',
  '/daily-companion/index.html',
  '/daily-companion/style.css?v=9',
  '/daily-companion/app.js?v=9',
  '/daily-companion/stories.js?v=9',
  '/daily-companion/knowledge.js?v=9',
  '/daily-companion/sound.js?v=9',
  '/daily-companion/manifest.json?v=9',
  '/daily-companion/icon-192.png',
  '/daily-companion/icon-512.png'
];

// 安装：缓存核心资源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// 激活：清理所有旧缓存，确保新版本立即生效
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// 拦截请求：对核心资源使用网络优先，确保总是获取最新版本
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // 核心资源（HTML/JS/CSS/JSON）：网络优先，失败时回退缓存
  const isCoreAsset = url.pathname.endsWith('.html') ||
                      url.pathname.endsWith('.css') ||
                      url.pathname.endsWith('.js') ||
                      url.pathname.endsWith('.json');

  if (isCoreAsset) {
    event.respondWith(
      fetch(request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        return caches.match(request);
      })
    );
    return;
  }

  // 其他资源（图片等）：缓存优先
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        return networkResponse;
      });
    }).catch(() => {
      return new Response('离线中，请连接网络后重试～', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
      });
    })
  );
});
