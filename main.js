// Configuration Options

require.config({
    baseUrl: 'client',
    // paths: maps ids with paths (no extension)
    paths: {
        'angular': 'libs/angular',
        'jQuery': 'https://code.jquery.com/jquery-2.1.1.min.js',
        'materialize': 'libs/materialize'
    },
    // shim: makes external libraries reachable
    shim: {
        angular: {
            exports: 'angular'
        }
    }
});

// Angular Bootstrap 
require(['tweetyApp'], function (tweetyApp) {
    // initialisation code defined within app.js
    tweetyApp.init();
});