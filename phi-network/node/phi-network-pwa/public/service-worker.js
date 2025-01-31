self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("phi-network-cache").then((cache) => {
      return cache.addAll([
        "/", 
        "/index.html",
        "/page.tsx",
        "/phi_network_raw.json",
      ]).catch((error) => {
        console.error("❌ Cache failed:", error);
      });
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch((error) => {
      console.error("❌ Fetch failed:", error);
      return new Response("Network error!", { status: 408 });
    })
  );
});
