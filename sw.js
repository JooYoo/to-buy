importScripts('js/cache-polyfill.js');

// Install the ServiceWorker
self.addEventListener('install', function(event) {
  event.waitUntil(

    // Open a cache
    caches.open('v1').then(function(cache) {

      // Define what we want to cache
      return cache.addAll([
        '/',
        'index.html',
        'CNAME',
        'js/app.js',
        'js/jquery.min.js',
        'js/note-list.js',
        'js/cache-polyfill.js',
        'css/style.css',
        'favicon.ico',
        'manifest.json',
        'img/icon-60.png',
        'img/icon-114.png',
        'img/icon-152.png',
        'img/icon-200.png',
        'img/apple-icon-57x57.png',
        'img/apple-icon-60x60.png',
        'img/apple-icon-72x72.png',
        'img/apple-icon-76x76.png',
        'img/apple-icon-114x114.png',
        'img/apple-icon-120x120.png',
        'img/apple-icon-144x144.png',
        'img/apple-icon-152x152.png',
        'img/apple-icon-180x180.png'
      ]);
    })
  );
});

// Use ServiceWorker (or not) to fetch data
// self.addEventListener('fetch', function(event) {

//   event.respondWith(

//     // Look for something in the cache that matches the request
//     caches.match(event.request).then(function(response) {

//       // If we find something, return it
//       // Otherwise, use the network instead
//       return response || fetch(event.request);
//     })
//   );
// });

addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(CACHE_DYNAMIC_NAME)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(CACHE_CONTAINING_ERROR_MESSAGES)
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
});
