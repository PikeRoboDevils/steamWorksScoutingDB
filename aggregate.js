use steamworks;

db.pike.aggregate([
    {
        $project:
            {
                "teamNumber": 1,
               // "autoScore.placement": 1,
                "autoScore.total": 1,
                //"autoScore.Points": 1,
                //"teleScore.gearTotal": 1,
                //"teleScore.levitatePoints": 1,
                //"autoScore.autoRunPoints": 1,
                "teleScore.vaultPoints": 1,
                "teleScore.levitation": 1,
                "teleScore.cubes": 1,
                "teleScore.total": 1,
                "teleScore.foul": 1,
                "teleScore.parking": 1,
                "teleScore.playStyle": 1,
                //"teleScore.fuelPoints": 1,
                "teleScore.climbSuccess": 1,
                "teleScore.climbAttempt": 1,
                "autoScore.placement": 1
                
                //"teleScore.climbPosition": 1
            }
    },
    {
        $group:
            {
                "_id": "$teamNumber",
                //"totalGears": {"$sum": "$teleScore.gearTotal"},
                // "averageGears": {"$avg": "$teleScore.gearTotal"},
                // "gearPlacement": {"$addToSet": "$autoScore.placement"},
                // "autoFuelAverage": {"$avg": "$autoScore.fuelPoints"},
                // "teleFuelAverage": {"$avg": "$teleScore.fuelPoints"},;
                "teleFoul": {"$avg": "$teleScore.foul"},
                "teleVault": {"$sum": "$teleScore.vaultPoints"},
                "teleParking": {"$avg": "$teleScore.parking"},
                "autoPlace": {"$avg": "$autoScore.placement"}, 
                "teleLevi": {"$avg": "$teleScore.levitation"},
                "telePlay": {"$avg": "$teleScore.playStyle"},
                "teleTotal": {"$sum": "$teleScore.total"},
                "teleCubes": {"$sum": "$teleScore.cubes"},
                "autoTotal": {"$sum": "$autoScore.total"},
                //"autoAvg": {"$avg": "$autoScore.total"},
                "attemptedClimbs": {"$sum": {"$cond": ["$teleScore.climbAttempt", 1, 0]}},
                "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climbSuccess", 1, 0]}},
                //"climbPlacement": {"$addToSet": "$teleScore.climbPosition"},
                "matches": {"$sum": 1}
            }
    },
    {
        $out: "temp"
    }
]);