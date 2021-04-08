
self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('Installing...');
    event.waitUntil(
        console.log('Installed!')
    );
});

self.addEventListener('fetch', function(event) {
    console.log('Fetch!');
});

self.addEventListener('activate', function(event) {
    console.log('Activated!');
});