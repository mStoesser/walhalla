const currentCacheVersion = 'v3';

self.addEventListener('install', event => {
    console.log('Install ServiceWorker', currentCacheVersion);

    event.waitUntil(
        caches.open(currentCacheVersion).then(cache => {
            console.log('install cache', currentCacheVersion);
            return cache.addAll([
                '/',
                '/index.html',
                '/style.css',
                '/app.js',

                '/assets/routes.json',

                '/component/home-start.js',
                '/component/tick-routes.js',

                '/service/storage-service.js',
                '/service/util.js',

                '/assets/icon-512.png',
                '/assets/icon-256.png',
                '/assets/icon-128.png',
                '/assets/icon-192-apple.png',
                '/assets/icon-maskable.png',
                '/assets/image_white_24dp.svg',

            ]);
        }).catch(err => console.log(err))
    );
    self.skipWaiting().then(_ => console.log('takeover'));
});

self.addEventListener('activate', async (event) => {
    console.log('Activate ServiceWorker', currentCacheVersion);

    // Cleanup old caches
    const cacheWhitelist = [currentCacheVersion];
    event.waitUntil(
        caches.keys().then( keyList => {
            return Promise.all(keyList.map(key => {
                if (cacheWhitelist.indexOf(key) === -1) {
                    console.log('remove cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    // after we've taken over, iterate over all the current clients (windows), and refresh
    const tabs = await self.clients.matchAll({type: 'window'})
    tabs.forEach(tab => tab.navigate(tab.url));
});

self.addEventListener('fetch', event => {
    event.respondWith(caches.match(event.request).then(response => {
        if (response !== undefined) { // caches.match() always resolves, but in case of success response will have value
            return response;
        } else {
            return fetch(event.request);
        }
    }));
});


