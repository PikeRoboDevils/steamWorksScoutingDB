use steamworks;

var result = db.Mishawaka19.aggregate([

    {
        $project:
            {
                "teamNumber": 1,

                "autoScore.placement": 1,
                "autoScore.sandstorm": 1,
                "autoScore.preload": 1,
                "autoScore.level": 1,
                "autoScore.autoRun": 1,
                "autoScore.rocketHatchOnePoints": 1,
                "autoScore.rocketHatchTwoPoints": 1,
                "autoScore.rocketHatchThreePoints": 1,
                "autoScore.rocketCargoOnePoints": 1,
                "autoScore.rocketCargoTwoPoints": 1,
                "autoScore.rocketCargoThreePoints": 1,
                "autoScore.stationHatch": 1,
                "autoScore.stationCargo": 1,
                "autoScore.hatchesDropped": 1,
                "autoScore.cargoesDropped": 1,

                "teleScore.breakdown": 1,
                "teleScore.rocketHatchOnePoints": 1,
                "teleScore.rocketHatchTwoPoints": 1,
                "teleScore.rocketHatchThreePoints": 1,
                "teleScore.rocketCargoOnePoints": 1,
                "teleScore.rocketCargoTwoPoints": 1,
                "teleScore.rocketCargoThreePoints": 1,
                "teleScore.cargoesDropped": 1,
                "teleScore.hatchesDropped": 1,
                "teleScore.stationHatch": 1,
                "teleScore.stationCargo": 1,
                "teleScore.loadingHatch": 1,
                "teleScore.loadingCargo": 1,
                "teleScore.rocketLevel": 1,
                "teleScore.climbLevel": 1,
                "teleScore.defending": 1

            }
    },
    
    {
        $group:
            {
                "_id": "$teamNumber",
                "avgAutoRocketHatchOne": {"$avg": "autoScore.rocketHatchOnePoints"},
                "avgAutoRocketHatchTwo": {"$avg": "autoScore.rocketHatchTwoPoints"},
                "avgAutoRocketHatchThree": {"$avg": "autoScore.rocketHatchThreePoints"},
                "avgAutoRocketCargoOne": {"$avg": "autoScore.rocketCargoOnePoints"},
                "avgAutoRocketCargoTwo": {"$avg": "autoScore.rocketCargoTwoPoints"},
                "avgAutoRocketCargoThree": {"$avg": "autoScore.rocketCargoThreePoints"},
                "avgAutoStationHatch": {"$avg": "autoScore.stationHatch"},
                "avgAutoStationCargo": {"$avg": "autoScore.stationCargo"},
                "avgAutoHatchDropped": {"$avg": "autoScore.hatchesDropped"},
                "avgAutoCargoDropped": {"$avg": "autoScore.cargoesDropped"},
                "autoRun": {"$addToSet": "autoScore.autoRun"},
                "startingLevel": {"$addToSet": "autoScore.level"},
                "preload": {"$addToSet": "autoScore.preload"},
                "sandstormType": {"$addToSet": "autoScore.sandstorm"},
                "startingPlacement": {"$addToSet": "autoScore.placement"},

                "avgTeleRocketHatchOne": {"$avg": "teleScore.rocketHatchOnePoints"},
                "avgTeleRocketHatchTwo": {"$avg": "teleScore.rocketHatchTwoPoints"},
                "avgTeleRocketHatchThree": {"$avg": "teleScore.rocketHatchThreePoints"},
                "avgTeleRocketCargoOne": {"$avg": "teleScore.rocketCargoOnePoints"},
                "avgTeleRocketCargoTwo": {"$avg": "teleScore.rocketCargoTwoPoints"},
                "avgTeleRocketCargoThree": {"$avg": "teleScore.rocketCargoThreePoints"},
                "avgTeleStationHatch": {"$avg": "teleScore.stationHatch"},
                "avgTeleStationCargo": {"$avg": "teleScore.stationCargo"},
                "avgTeleLoadingHatch": {"$avg": "teleScore.loadingHatch"},
                "avgTeleLoadingCargo": {"$avg": "teleScore.loadingCargo"},
                "avgTeleHatchDropped": {"$avg": "teleScore.hatchesDropped"},
                "avgTeleCargoDropped": {"$avg": "teleScore.cargoesDropped"},
                "defending": {"$addToSet": "teleScore.defending"},
                "breakdown": {"$addToSet": "teleScore.breakdown"},
                "rocketLevelReach": {"$addToSet": "teleScore.rocketLevel"},
                "climbLevel": {"$addToSet": "teleScore.climbLevel"},

                "matches": {"$sum": 1}
            }
    }

]);

db.temp.insert(result.result);
