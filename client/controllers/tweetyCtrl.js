define(['angular'], function (angular) {

    function TweetyCtrl(tweetyFactory, chartsFactory) {
        this.tweetyFactory = tweetyFactory;
        this.chartsFactory = chartsFactory;

        this.applicationName = 'Tweety';

        this.pages = [1, 0, 0, 0, 0, 0, 0, 0];
        this.currentPage = 0;   
        this.musicianDic = {};
        this.musician = {};
        this.tabsInfoDic = {};
        this.activeTab = "";
        this.isFirstTimeDraw = true;
        this.isError = false;
        this.errorText = "";

    }

    TweetyCtrl.prototype = {
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

                /*$(document).ready(function () {
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

                });*/
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
                ctrl._initializeTabsInfoDic();
                ctrl.nextPage();
                ctrl.changeAnalyzeType("languages");
            }).catch(function (response) {
                debugger;
                ctrl.isLoading = false;
            });
        },
        changeAnalyzeType: function (type) {
            if (this.activeTab != "") {
                this.tabsInfoDic[this.activeTab].isActive = false;
            }

            this.activeTab = type;
            this.tabsInfoDic[this.activeTab].isActive = true;

            if (!this.tabsInfoDic[this.activeTab].isAlreadyDrawn) {
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

            settings[this.selectedFeelingLuckyOption.toLowerCase()] = true;

            this.tweetyFactory.feelingLuckyAnalysis(this.selectedMusicianID, settings).then(function () {
            }).catch(function () {
                debugger;
            });
        },
        firstLetterAsCapital: function (word) {
                var newWord = word.charAt(0).toUpperCase() + word.substring(1,word.length);
                return newWord;
        },
        validateAnalyzeSettings: function () {
            this.isError = false;
            if (!(this.platform ||
                this.language ||
                this.hashTags ||
                this.contributers ||
                this.topRatesTweets ||
                this.topRelatedMusician ||
                this.sentimentAnalysis ||
                this.timeAnalysis)) {
                this.isError = true;
                this.errorText = "Please choose at least one option"
            } else {
                this.nextPage();
            }
        },
        // private methodes
        _parseMusicianList: function (data) {
            angular.forEach(data, function (value, key) {
                this.musicianDic[value] = key;
            }, this);
        },
        _drawChart: function (analyzedData) {
            debugger;
            var ctrl = this;

            var title = this.tabsInfoDic[this.activeTab].title;
            var type = this.tabsInfoDic[this.activeTab].type;
            var col1 = this.tabsInfoDic[this.activeTab].col1;
            var col2 = this.tabsInfoDic[this.activeTab].col2;

            this.chartsFactory.drawChart(analyzedData, title, this.activeTab, type, col1, col2).then(function () {
                ctrl.tabsInfoDic[ctrl.activeTab].isAlreadyDrawn = true;
            })
        },
        _initializeTabsInfoDic: function () {

            this.tabsInfoDic['languages'] = { isActive: false, isAlreadyDrawn: false, type:"pieChart" , title: "Tweets by Language", col1: "languages", col2: "number of tweets"};
            this.tabsInfoDic['contributers'] = { isActive: false, isAlreadyDrawn: false, type: "pieChart", title: "bla" };
            this.tabsInfoDic['platform'] = { isActive: false, isAlreadyDrawn: false, type: "pieChart", title: "Tweets by Platform", col1: "platform", col2: "number of tweets" };
            this.tabsInfoDic['hashtags'] = { isActive: false, isAlreadyDrawn: false, type: "barChart", title: "Most common Hashtags", col1:"Hashtag", col2: "number of tweets" };
            this.tabsInfoDic['tweets'] = { isActive: false, isAlreadyDrawn: false, type: "pieChart", title: "bla" };
            this.tabsInfoDic['relatedMusician'] = { isActive: false, isAlreadyDrawn: false, type: "pieChart", title: "bla" };
        }
    }

    return TweetyCtrl;
});

