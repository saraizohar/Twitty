<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0" />
    <title>Tweety</title>
    <!-- CSS  -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="css/materialize.css" type="text/css" rel="stylesheet" media="screen,projection" />
    <link href="css/style.css" type="text/css" rel="stylesheet" media="screen,projection" />

    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="./client/twittyCtrl.js"></script>
</head>
<body ng-app="twittyApp">
    <div ng-controller="twittyCtrl as twittyCtrl">

        <nav class="light-blue lighten-1" role="navigation">
            <div class="nav-wrapper container">
                <a id="logo-container" href="#" class="brand-logo">Logo</a>
                <ul class="right hide-on-med-and-down">
                    <li><a href="#">Navbar Link</a></li>
                </ul>
                <ul id="nav-mobile" class="side-nav">
                    <li><a href="#">Navbar Link</a></li>
                </ul>
                <a href="#" data-activates="nav-mobile" class="button-collapse"><i class="material-icons">menu</i></a>
            </div>
        </nav>
        <div ng-if="twittyCtrl.pages[0]" ng-include="'./client/pages/welcome.html'"></div>
        <div ng-if="twittyCtrl.pages[1]" ng-include="'./client/pages/chooseMusician.html'"></div>
        <div ng-if="twittyCtrl.pages[2]" ng-include="'./client/pages/basicInfo.html'"></div>
        <div ng-if="twittyCtrl.pages[3]" ng-include="'./client/pages/basicAnalysisFilters.html'"></div>
        <div ng-if="twittyCtrl.pages[4]" ng-include="'./client/pages/advancedAnalysisFilters.html'"> </div>
        <div ng-if="twittyCtrl.pages[5]" ng-include="'./client/pages/done.html'"></div>
        <div ng-if="twittyCtrl.pages[6]" ng-include="'./client/pages/analysisResults.html'"></div>
    </div>

    <!--  Scripts-->
    <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
    <script src="js/materialize.js"></script>
    <script src="js/init.js"></script>
</body>
</html>
