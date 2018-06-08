importScripts('js/cache-polyfill.js');

// Install the ServiceWorker
self.addEventListener('install', function (event) {
  event.waitUntil(

    // Open a cache
    caches.open('v1').then(function (cache) {

      // Define what we want to cache
      return cache.addAll([
        '/',
        'index.html',
        'sw.js',
        'js/app.js',
        'js/jquery.min.js',
        'js/note-list.js',
        'js/cache-polyfill.js',
        'css/style.css',
        'favicon.ico',
        'manifest.json',
        'img/icon-60.png',
        'img/icon-114.png',
        'img/icon-152.png'
      ]);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log("[Service Worker] activating service Worker", event);
  return self.clients.claim();
});

// Fetch Event 01
// Use ServiceWorker (or not) to fetch data
self.addEventListener('fetch', function (event) {
  event.respondWith(
    // Look for something in the cache that matches the request
    caches.match(event.request).then(function (response) {
      // If we find something, return it
      // Otherwise, use the network instead
      return response || fetch(event.request);
    })
  );
});

//Fetchd Event 02
// self.addEventListener('fetch',function(event){
//   console.log('[Service Worker] fetching something......', event);
//   event.respondWith(fetch(event.request));
// });
