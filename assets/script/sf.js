var body = document.querySelector('body');

window.onload = function() {
  console.log('Page Loaded!');  
};

if ('serviceWorker' in navigator) {
    console.log('Service Work Ok!');
    window.addEventListener('load', function() {

        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });

    });

    self.addEventListener('install', function(event) {
        // Perform install steps
        console.log('Installing...');
    });
}