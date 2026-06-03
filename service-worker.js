/**
 * Daily Companion Service Worker
 * 缓存核心资源，支持离线访问
 */

const CACHE_NAME = 'daily-companion-v2';
const urlsToCache = [
  '/daily-companion/',
  '/daily-companion/index.html',
  '/daily-companion/style.css',
  '/daily-companion/app.js',
  '/daily-companion/knowledge.js',
  '/daily-companion/sound.js',
  '/daily-companion/manifest.json',
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

// 激活：清理旧缓存
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

// 拦截请求：优先从缓存读取，网络作为后备
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // 缓存命中则直接返回
      if (response) {
        return response;
      }
      // 否则发起网络请求
      return fetch(event.request).then((networkResponse) => {
        // 不缓存非成功响应或跨域请求
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }
        // 将新资源加入缓存
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      });
    }).catch(() => {
      // 离线且无缓存时的兜底
      return new Response('离线中，请连接网络后重试～', {
        status: 503,
        statusText: 'Service Unavailable',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' }
      });
    })
  );
});
