const CACHE_NAME = "salida-zapata-v1.2";
const urlsToCache = [
  "./",
  "./index.html",
  "./pantalla2.html",
  "./pantalla3.html",
  "./pantalla4.html",
  "./pantalla5.html",
  "./pantalla6.html",
  "./logo_proveedora.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});
