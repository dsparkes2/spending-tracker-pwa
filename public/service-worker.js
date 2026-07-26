
self.addEventListener('install', event => {
    caches.open('app-cache').then(cache => {
        cache.addAll(['/']);
    });
});
