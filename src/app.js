import './component/home-start.js'
import './component/tick-routes.js'
import './service/storage-service.js'


// if (config.mode === 'PROD') {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/service-worker.js', { scope: '/', type: "module" }).then(function(registration) {
                // Registration was successful
                console.log('Registered!');
            }, function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            }).catch(function(err) {
                console.log(err);
            });
        });
    } else {
        console.log('service worker is not supported');
    }
// }
