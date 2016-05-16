<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
    <script src="./client/twittyCtrl.js"></script>

</head>
<body ng-app="twittyApp">
    <div ng-controller="twittyCtrl as twittyCtrl">
        <div ng-if="twittyCtrl.pages[0]">
            <h1>Welcome to twitty!</h1>
            <h2>Our app let you analize your fevorite's twitts</h2>
            <button ng-click="twittyCtrl.getStarted()">
                Let's get started
            </button>
        </div>
        <div ng-if="twittyCtrl.pages[1]">
            <h1>Twitty!</h1>
            <h2>Choose musician name:</h2>
            <input type="text" name="example" list="exampleList" ng-model="twittyCtrl.selectedMusician">
            <datalist id="exampleList">
                <option ng-repeat="singer in twittyCtrl.singersList" value="{{singer}}">
            </datalist>
            <div>
                <button ng-click="twittyCtrl.searchMusician()">Search</button>
                <button>I'm Feeling Lucky</button>
            </div>
        </div>
        <div ng-if="twittyCtrl.pages[2]">
            <h1>Twitty</h1>
            <h2>{{twittyCtrl.musician.user.name}}</h2>
            <h3>{{twittyCtrl.musician.user.accountName}}</h3>
            <img src="{{twittyCtrl.musician.user.imageURL}}"/>
            <h3>Followers Count: {{twittyCtrl.musician.user.followersCount}}</h3>
            <h3>Tweets-Mentioned-Him Count: {{twittyCtrl.musician.user.tweetsmentionedCount}}</h3>
            <h3>Contributes Count: {{twittyCtrl.musician.user.contributesCount}}</h3>
            <h1>Lets Make Tweets Analysis!</h1>
            <button ng-click="twittyCtrl.nextPage()">Continue</button>
        </div>
        <div ng-if="twittyCtrl.pages[3]">
            <div ng-include="client/test.html"></div>
            
            <h1>Twitty</h1>
            <h2>{{twittyCtrl.musician.user.name}}</h2>
            <h3>{{twittyCtrl.musician.user.accountName}}</h3>
            <h4>Choose Basic Analysis Filters:</h4>
            <input type="checkbox" ng-model="twittyCtrl.isPlatformAnalysis"/>Platform<br />
            <input type="checkbox" ng-model="twittyCtrl.isLanguageAnalysis"/>Language<br />
            <input type="checkbox" ng-model="twittyCtrl.isReactionModel"/>Reaction<br />
            <button>Continue</button>
            <button>Skip</button>
        </div>

    </div>

</body>
</html>
