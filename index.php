<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
    <title>Tweety</title>
    <!-- CSS  -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="client/css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="client/css/style.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="client/css/tweety.css" type="text/css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <!-- advanced setup: using public CDN with local file fallback -->
    <script data-main="main" src="http://requirejs.org/docs/release/2.2.0/comments/require.js"></script>
    <!--
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>    
    -->
    
    
   
</head>
<body>
    <div ng-controller="tweetyCtrl as tweetyCtrl">

        <nav class="light-blue lighten-1" role="navigation">
            <div class="nav-wrapper container">
                <a id="logo-container" href="#" class="brand-logo">Logo</a>
            </div>
        </nav>
        <div ng-if="tweetyCtrl.pages[0]" ng-include="'./client/pages/welcome.html'"></div>
        <div ng-if="tweetyCtrl.pages[1]" ng-include="'./client/pages/chooseMusician.html'"></div>
        <div ng-if="tweetyCtrl.pages[2]" ng-include="'./client/pages/basicInfo.html'"></div>
        <div ng-if="tweetyCtrl.pages[3]" ng-include="'./client/pages/basicAnalysisFilters.html'"></div>
        <div ng-if="tweetyCtrl.pages[4]" ng-include="'./client/pages/advancedAnalysisFilters.html'"> </div>
        <div ng-if="tweetyCtrl.pages[5]" ng-include="'./client/pages/done.html'"></div>
        <div ng-if="tweetyCtrl.pages[6]" ng-include="'./client/pages/analysisResults.html'"></div>
        <div ng-if="tweetyCtrl.pages[7]" ng-include="'./client/pages/feelingLucky.html'"></div>
    </div> 
</body>
</html>
