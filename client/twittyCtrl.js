/*require(['./client/twittyFactory'], function (f) {
    var sarai = 0;
});*/

angular.module('twittyApp', [])
  .controller('twittyCtrl', ['$http', TwittyCtrl]);

function TwittyCtrl($http) {
    this.applicationName = 'Tweety';

    this.pages = [1, 0, 0, 0, 0, 0, 0, 0];
    this.currentPage = 0;
    this.$http = $http;
    this.musicianDic = {};
    this.musician = {};
    this.isTabActiveDic = {};
    this.activeTab = "";
    this.isFirstTimeDraw = true;

}

TwittyCtrl.prototype = {
    nextPage: function (pageNum) {
        this.pages[this.currentPage] = 0;
        this.currentPage = pageNum ? pageNum : this.currentPage + 1
        //this.currentPage++;
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

            $(document).ready(function () {
                $('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: false, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: false, // Displays dropdown below the button
                    alignment: 'left' // Displays dropdown with edge aligned to the left of button
                }
               );

            });

        }, function errorCallback(response) {
            debugger;
        });
    },
    getMusicianBasicInfo: function () {
        var ctrl = this;
        ctrl.isLoading = true;

        var selectedMusicianID = this.musicianDic[ctrl.selectedMusician];
        this.$http({
            method: 'POST',
            url: './server/twittyAPI.php',
            data: 'action=getMusicianBasicInfo&musicianID=' + selectedMusicianID,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
            ctrl.isLoading = false;
            ctrl.musician.user = response.data;
            ctrl.nextPage();
        }, function errorCallback(response) {
            ctrl.isLoading = false;
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
        this.isLoading = true;

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
            ctrl.isLoading = false;
            ctrl.analyzedData = response.data;

            ctrl.platform = response.data.platform;
            ctrl._initializeIsTabActiveDic();
            ctrl.nextPage();
            ctrl.changeAnalyzeType("languages");
        }, function errorCallback(response) {
            debugger;
            ctrl.isLoading = false;
        });
    },
    changeAnalyzeType: function (type) {
        debugger;
        if (this.activeTab != "") {
            this.isTabActiveDic[this.activeTab].isActive = false;
        }

        this.activeTab = type;
        this.isTabActiveDic[this.activeTab].isActive = true;

        if (!this.isTabActiveDic[this.activeTab].isAlreadyDrawn) {
            this._drawChart(this.analyzedData[type], type);
            this.isFirstTimeDraw = false;
        }

    },
    feelingLuckyAnalysis: function () {
        var ctrl = this;

        var settings = {
            hashtags: false,
            musician: false,
            tweet: false
        }

        settings[twittyCtrl.selectedFeelingLuckyOption.toLowerCase()] = true;

        var queryString = "";
        angular.forEach(settings, function (value, key) {
            value = !value ? null : value;
            queryString += "&" + key + "=" + value;
        }, this);

        this.$http({
            method: 'POST',
            url: './server/feelingLuckyAPI.php',
            data: 'action=feelingLuckyAnalayz' + queryString,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function successCallback(response) {
   
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
    _drawChart: function (analyzedData, titleStr, chartType) {
        var ctrl = this;

        if (this.isFirstTimeDraw) {
            google.charts.load("current", { packages: ["corechart"] });
            google.charts.setOnLoadCallback(drawChart);
        } else {
            drawChart();
        }
        
        function drawChart() {
            ctrl.isTabActiveDic[ctrl.activeTab].isAlreadyDrawn = true;

            var chartData = [['Task', 'Hours per Day']];
            angular.forEach(analyzedData, function (value, key) {
                chartData.push([key, value]);
            }, this);


            var data = google.visualization.arrayToDataTable(chartData);

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
                width: 900,
                height: 500
            };

            var chart = new google.visualization.PieChart(document.getElementById(ctrl.activeTab));
            chart.draw(data, options);
        }
    },
    _initializeIsTabActiveDic: function () {

        this.isTabActiveDic['languages'] = {isActive: false, isAlreadyDrawn:false};
        this.isTabActiveDic['contributers'] = { isActive: false, isAlreadyDrawn: false };
        this.isTabActiveDic['platform'] = { isActive: false, isAlreadyDrawn: false };
        this.isTabActiveDic['hashtags'] = { isActive: false, isAlreadyDrawn: false };
        this.isTabActiveDic['tweets'] = { isActive: false, isAlreadyDrawn: false };
        this.isTabActiveDic['relatedMusician'] = { isActive: false, isAlreadyDrawn: false };
    }
}