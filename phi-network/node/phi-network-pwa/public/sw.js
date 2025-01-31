// public/sw.js

const CACHE_NAME = 'phi-network-cache-v1';
const RESOURCES_TO_CACHE = [
  '/favicon.ico',
  '/manifest.json',
  '/image/logo.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  // Add other necessary static assets like CSS, JS, etc.
];

// Install Event - Caches Static Assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        try {
          // Remove '/' from RESOURCES_TO_CACHE if it causes issues
          const validResources = RESOURCES_TO_CACHE.filter(resource => resource !== '/');
          await cache.addAll(validResources);
          console.log('✅ All resources cached successfully!');
        } catch (error) {
          console.error('❌ Failed to cache some resources:', error);
        }
      })
      .catch((error) => {
        console.error('❌ Cache open failed:', error);
      })
  );
});

// Activate Event - Cleans Up Old Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log(`🗑️  Deleting old cache: ${cache}`);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch Event - Responds with Cached Resources or Fetches from Network
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          // Return cached resource
          return response;
        }

        // Fetch from network
        return fetch(event.request)
          .then((networkResponse) => {
            // Check if we received a valid response
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response
            const responseToCache = networkResponse.clone();

            // Open cache and store the fetched resource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              })
              .catch((error) => {
                console.error('❌ Failed to cache network response:', error);
              });

            return networkResponse;
          })
          .catch((error) => {
            console.error('❌ Fetch failed:', error);
            // Optionally, return a fallback page
            return caches.match('/fallback.html');
          });
      })
  );
});
