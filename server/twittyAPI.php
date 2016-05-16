<?php
    if($_SERVER["REQUEST_METHOD"] === 'POST'){
        $action = $_POST["action"];

        header("Access-Control-Allow-Origin: *");
        header("Content-Type: application/json; charset=UTF-8");

        switch ($action){
            case "getSingersList":
                $result = ["muse", "oasis", "britney spears", "justin timberlake"];
                break;
            case "searchMusician":
                $musicianName = $_POST["name"];

                $result = [];
                $result["name"] = $musicianName;
                $result["accountName"] = $musicianName. " the king";
                $result["popularityPercent"] = "80";
                $result["imageURL"] = "http://bichonfrise.sites.livecms.co.il/UploadImages/000348/Categories/213554_images%20(2).jpg";
                $result["followersCount"] = 100;
                $result["tweetsmentionedCount"] = 90;
                $result["contributesCount"] = 12;

                break;
        }

        

        echo (json_encode($result));
    }
?>