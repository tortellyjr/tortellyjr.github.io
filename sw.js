
self.addEventListener('install', function(event) {
    // Perform install steps
    console.log('Installing...');
    event.waitUntil(
        console.log('Installed')
    );
});