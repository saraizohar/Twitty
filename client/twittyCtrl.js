define(['angular'], function (angular) {

    function TwittyCtrl(tweetyFactory) {
        this.tweetyFactory = tweetyFactory;

        this.applicationName = 'Tweety';

        this.pages = [1, 0, 0, 0, 0, 0, 0, 0];
        this.currentPage = 0;   
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
            this.tweetyFactory.getmusicianDic().then(function (response) {
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
            }).catch(function (response) {
                debugger;
            });
        },
        getMusicianBasicInfo: function () {
            var ctrl = this;
            ctrl.isLoading = true;

            this.selectedMusicianID = this.musicianDic[ctrl.selectedMusician];
            this.tweetyFactory.getMusicianBasicInfo(this.selectedMusicianID).then(function (response) {
                ctrl.isLoading = false;
                ctrl.musician.user = response.data;
                ctrl.nextPage();
            }).catch(function (response) {
                ctrl.isLoading = false;
                debugger;
            });
        },
        calculateResults: function () {
            this.isLoading = true;
            var ctrl = this;

            var settings = {};
            settings["platform"] = this.platform;
            settings["language"] = this.language;
            settings["hashTags"] = this.hashTags;
            settings["contributers"] = this.contributers;
            settings["topRatesTweets"] = this.topRatesTweets;
            settings["topRelatedMusician"] = this.topRelatedMusician;
            settings["sentimentAnalysis"] = this.sentimentAnalysis;
            settings["timeAnalysis"] = this.timeAnalysis;

            this.tweetyFactory.calculateResults(this.selectedMusicianID, settings).then(function (response) {
                debugger;
                ctrl.isLoading = false;
                ctrl.analyzedData = response.data;

                ctrl.platform = response.data.platform;
                ctrl._initializeIsTabActiveDic();
                ctrl.nextPage();
                ctrl.changeAnalyzeType("languages");
            }).catch(function (response) {
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

            this.selectedMusicianID = this.musicianDic[ctrl.selectedMusician];

            var settings = {
                hashtags: false,
                musician: false,
                tweet: false
            }

            settings[twittyCtrl.selectedFeelingLuckyOption.toLowerCase()] = true;

            this.tweetyFactory.feelingLuckyAnalysis(this.selectedMusicianID, settings).then(function () {
            }).catch(function () {
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

            this.isTabActiveDic['languages'] = { isActive: false, isAlreadyDrawn: false };
            this.isTabActiveDic['contributers'] = { isActive: false, isAlreadyDrawn: false };
            this.isTabActiveDic['platform'] = { isActive: false, isAlreadyDrawn: false };
            this.isTabActiveDic['hashtags'] = { isActive: false, isAlreadyDrawn: false };
            this.isTabActiveDic['tweets'] = { isActive: false, isAlreadyDrawn: false };
            this.isTabActiveDic['relatedMusician'] = { isActive: false, isAlreadyDrawn: false };
        }
    }

    return TwittyCtrl;
});

