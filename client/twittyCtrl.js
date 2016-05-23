/*require(['./client/twittyFactory'], function (f) {
    var sarai = 0;
});*/

angular.module('twittyApp', [])
  .controller('twittyCtrl', ['$http', TwittyCtrl]);

function TwittyCtrl($http) {
    this.pages = [1, 0, 0, 0];
    this.currentPage = 0;
    this.$http = $http;
    this.singersList = [];
    this.musician = {};
}

TwittyCtrl.prototype = {
    nextPage: function () {
        this.pages[this.currentPage] = 0;
        this.currentPage++;
        this.pages[this.currentPage] = 1;
    },
    getStarted: function () {
        var ctrl = this;
        this.$http({
            method: 'POST',
            url: './server/twittyAPI.php',
            data: 'action=getSingersList',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            ctrl.singersList = response.data;
            ctrl.nextPage();
        }, function errorCallback(response) {
            debugger;
        });
    },
    searchMusician: function () {
        var ctrl = this;
        this.$http({
            method: 'POST',
            url: './server/twittyAPI.php',
            data: 'action=searchMusician&name='+ctrl.selectedMusician,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            ctrl.musician.user = response.data;
            ctrl.nextPage();
        }, function errorCallback(response) {
            debugger;
        });
    },
    makeTweetsAnalysis: function () {
        var ctrl = this;
        this.$http({
            method: 'POST',
            url: './server/twittyAPI.php',
            data: 'action=makeTweetAnalysis&name=' + ctrl.selectedMusician,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            ctrl.musician.tweetsAnalysis = response.data;
            ctrl.nextPage();
        }, function errorCallback(response) {
            debugger;
        });
    },
    calculateResults: function () {
        
    }
}