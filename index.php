<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
    <script src="http://requirejs.org/docs/release/2.2.0/comments/require.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="./client/twittyCtrl.js"></script>
    

</head>
<body ng-app="twittyApp">
    <div ng-controller="twittyCtrl as twittyCtrl">
        <div ng-if="twittyCtrl.pages[0]" ng-include="'./client/pages/welcome.html'"></div>
        <div ng-if="twittyCtrl.pages[1]" ng-include="'./client/pages/chooseMusician.html'"></div>
        <div ng-if="twittyCtrl.pages[2]" ng-include="'./client/pages/basicInfo.html'"></div>
        <div ng-if="twittyCtrl.pages[3]" ng-include="'./client/pages/basicAnalysisFilters.html'"></div>
        <div ng-if="twittyCtrl.pages[4]" ng-include="'./client/pages/advancedAnalysisFilters.html'"> </div>
        <div ng-if="twittyCtrl.pages[5]" ng-include="'./client/pages/done.html'"></div>
        <div ng-if="twittyCtrl.pages[6]" ng-include="'./client/pages/analysisResults.html'"></div>
    </div>
</body>
</html>
