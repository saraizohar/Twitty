// Configuration Options

require.config({
    baseUrl: 'client',
    // paths: maps ids with paths (no extension)
    paths: {
        'angular': 'libs/angular',
        'jquery': 'https://code.jquery.com/jquery-2.1.1.min',
        'materialize': 'libs/materialize',
        'googleCharts': 'https://www.gstatic.com/charts/loader',
        'hammer': 'http://hammerjs.github.io/dist/hammer.min'
    },
    // shim: makes external libraries reachable
    shim: {
        angular: {
            exports: 'angular'
        },
        jquery: {
            exports: 'jquery'
        },
        googleCharts: {
            exports: 'googleCharts'
        },
        hammer: {
            exports: 'hammer'
        }
    }
});

// Angular Bootstrap 
require(['tweetyApp'], function (tweetyApp) {
    // initialisation code defined within app.js
    tweetyApp.init();
});