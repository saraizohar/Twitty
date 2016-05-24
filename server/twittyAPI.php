<?php
    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        $action = $_POST["action"];

        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");

        $musiciansList = [];
        $musiciansList[] = "muse";
        $musiciansList[] = "oasis";
        $musiciansList[] = "britney spears";
        $musiciansList[] = "justin timberlake";

        switch ($action){
            case "getMusicianList":
                $result = $musiciansList;
                break;
            case "getMusicianBasicInfo":
                $id = $_POST["musicianID"];
                $musicianName = $musiciansList[$id];

                $result = [];
                $result["name"] = $musicianName;
                $result["accountName"] = $musicianName. " the king";
                $result["popularityPercent"] = "80";
                $result["imageURL"] = "http://bichonfrise.sites.livecms.co.il/UploadImages/000348/Categories/213554_images%20(2).jpg";
                $result["followersCount"] = 100;
                $result["tweetsmentionedCount"] = 90;
                $result["contributesCount"] = 12;

                break;
            case "analyzeTweets":
                $platform = $_POST["platformAnalysis"];
                $language = $_POST["languageAnalysis"];
                $hashTags = $_POST["hashTags"];
                $contributers = $_POST["contributers"];
                $topRatesTweets = $_POST["topRatesTweets"];
                $topRelatedMusician = $_POST["topRelatedMusician"];
                $sentimentAnalysis = $_POST["sentimentAnalysis"];
                $timeAnalysis = $_POST["timeAnalysis"];

                $result = [];
                $result["platform"] = [];
                $result["platform"]["android"]=40;
                $result["platform"]["iOS"]=22;
                $result["platform"]["web"]=35;
                $result["platform"]["ynet"]=3;
               
                break;
        }

        

        echo (json_encode($result));
    }
?>