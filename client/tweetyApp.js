define(['angular',
    'materialize',
    'jquery',
    'googleCharts',
    './controllers/tweetyCtrl',
    './factories/tweetyFactory',
    './factories/chartsFactory'],
    function (angular, materialize, jquery, google, tweetyCtrl, tweetyFactory, chartsFactory) {
    var app = angular.module('twittyApp', []);

    app.init = function () {
        angular.bootstrap(document, ['twittyApp']);
    };

    app.factory('tweetyFactory', ['$http', '$q', tweetyFactory]);
    app.factory('chartsFactory', ['$q', chartsFactory]);
    app.controller('tweetyCtrl', ['tweetyFactory', 'chartsFactory', tweetyCtrl]);

    return app;
});