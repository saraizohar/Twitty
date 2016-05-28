define(function () {
    function TweetyFactory($http, $q) {

        return {
            getmusicianDic: function () {
                return $q(function (resolve, reject) {
                    $http({
                        method: 'POST',
                        url: './server/twittyAPI.php',
                        data: 'action=getMusicianList',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function successCallback(response) {
                        resolve(response);

                    }, function errorCallback(response) {
                        reject(response);
                    });
                });
            },
            getMusicianBasicInfo: function (musicianID) {
                return $q(function (resolve, reject) {
                    $http({
                        method: 'POST',
                        url: './server/twittyAPI.php',
                        data: 'action=getMusicianBasicInfo&musicianID=' + musicianID,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function successCallback(response) {
                        resolve(response);
                    }, function errorCallback(response) {
                        reject(response);
                    });
                });
            },
            calculateResults: function (musicianID, settings) {
                return $q(function (resolve, reject) {
                    var queryString = "&id=" + musicianID;
                    angular.forEach(settings, function (value, key) {
                        value = !value ? null : value;
                        queryString += "&" + key + "=" + value;
                    }, this);

                    $http({
                        method: 'POST',
                        url: './server/twittyAPI.php',
                        data: 'action=analyzeTweets' + queryString,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function successCallback(response) {
                        resolve(response);
                    }, function errorCallback(response) {
                        reject(response);
                    });
                });
            },
            feelingLuckyAnalysis: function (musicianID, settings) {
                return $q(function (resolve, reject) {
                    var queryString = "";
                    angular.forEach(settings, function (value, key) {
                        value = !value ? null : value;
                        queryString += "&" + key + "=" + value;
                    }, this);

                    $http({
                        method: 'POST',
                        url: './server/feelingLuckyAPI.php',
                        data: 'action=feelingLuckyAnalayz' + queryString,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then(function successCallback(response) {
                        resolve(response);
                    }, function errorCallback(response) {
                        resolve(response);
                    });
                });
            }
        }
    }

    return TweetyFactory;
});