define(['angular', './twittyCtrl', './tweetyFactory'], function (angular, twittyCtrl, tweetyFactory) {
    var app = angular.module('twittyApp', []);

    app.init = function () {
        angular.bootstrap(document, ['twittyApp']);
    };

    app.factory('tweetyFactory', ['$http', '$q', tweetyFactory]);
    app.controller('twittyCtrl', ['tweetyFactory', twittyCtrl]);

    return app;
});