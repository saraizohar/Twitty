/*require(['./client/twittyFactory'], function (f) {
    var sarai = 0;
});*/

angular.module('twittyApp', [])
  .controller('twittyCtrl', ['$http', TwittyCtrl]);

function TwittyCtrl($http) {
    this.pages = [1, 0, 0, 0];
    this.currentPage = 0;
    this.$http = $http;
    this.musicianDic = {};
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
            data: 'action=getMusicianList',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            ctrl._parseMusicianList(response.data);
            ctrl.nextPage();
        }, function errorCallback(response) {
            debugger;
        });
    },
    getMusicianBasicInfo: function () {
        var ctrl = this;
        var selectedMusicianID = this.musicianDic[ctrl.selectedMusician];
        this.$http({
            method: 'POST',
            url: './server/twittyAPI.php',
            data: 'action=getMusicianBasicInfo&musicianID=' + selectedMusicianID,
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
        debugger;
        var settings = {};
        settings["platform"] = this.platform;
        settings["language"] = this.language;
        settings["hashTags"] = this.hashTags;
        settings["contributers"] = this.contributers;
        settings["topRatesTweets"] = this.topRatesTweets;
        settings["topRelatedMusician"] = this.topRelatedMusician;
        settings["sentimentAnalysis"] = this.sentimentAnalysis;
        settings["timeAnalysis"] = this.timeAnalysis;

        var queryString = "";
        angular.forEach(settings, function (value, key) {
            value = !value ? null : value;
            queryString += "&" + key + "=" + value;
        }, this);

        var ctrl = this;
        this.$http({
            method: 'POST',
            url: './server/twittyAPI.php',
            data: 'action=analyzeTweets'+queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            debugger;
            ctrl.platform = response.data.platform;
            ctrl.nextPage();
            ctrl._drawChart(ctrl.platform, "Platform analysis");
        }, function errorCallback(response) {
            debugger;
        });
    },
    // private methodes
    _parseMusicianList: function (data) {
        angular.forEach(data, function (value, key) {
            this.musicianDic[value] = key;
        }, this);
    },
    _drawChart: function (test, titleStr) {
        debugger;
        google.charts.load("current", { packages: ["corechart"] });
        google.charts.setOnLoadCallback(drawChart);
        function drawChart() {

            var ness = [['Task', 'Hours per Day']];
            angular.forEach(test, function (value, key) {
                ness.push([key, value]);
            }, this);


            var data = google.visualization.arrayToDataTable(ness);

            /*var data = google.visualization.arrayToDataTable([
                  ['Task', 'Hours per Day'],
                  ['android', 40],
                  ['iOS', 22],
                  ['web', 35],
                  ['ynet', 3]
            ]);*/

            var options = {
                title: titleStr,
                pieHole: 0.4,
            };

            var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
            chart.draw(data, options);
        }
    }
}