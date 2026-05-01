const CACHE_NAME = "my-pwa-sample-v1"

const CORE_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/favicon.ico",
    "/logo192.png",
    "/logo512.png",
    "/static/css/main.631e67b3.css",
    "/static/js/main.58bb5138.js",
    "/static/js/453.88a6dc13.chunk.js"
];

//Install Service Worker
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(CORE_ASSETS);    
        })
    );
    self.skipWaiting();
});

//Activate Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((names) =>
        Promise.all(
            names
            .filter((name) => name !== CACHE_NAME)
            .map((name) => caches.delete(name))
        )
    )
);
self.client.claim();
});

// Cache First Strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) return cached;

    const networkResponse = await fetch(request);
    cache.put(request, networkResponse.clone());
    return networkResponse;
}

// Network First Strategy
async function networkFirst(request) {
   const cache = await caches.open(CACHE_NAME);

   try {
      const networkResponse = await fetch(request);
      cache.put(request, networkResponse.clone());
      return networkResponse;
} catch {
      return cache.match(request);
}
}

// Fetch Handler
self.addEventListener("fetch", (event) => {
    const request = event.request;

// HTML navigation
if (request.mode === "navigate") {
    event.respondWith(networkFirst(request));
    return;
}

//Static assets
event.respondWith(cacheFirst(request));
});
