use steamworks;

db.pike.aggregate([
    {
        $project:
            {
                "teamNumber": 1,
               // "autoScore.placement": 1,
                "autoScore.total": 1,
<<<<<<< HEAD
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
=======
                "autoScore.fuelPoints": 1,
                "autoScore.gearAttempt": 1,
                "autoScore.gearTotal": 1,
                "teleScore.gearTotal": 1,
                "teleScore.fuelPoints": 1,
                "teleScore.climbSuccess": 1,
                "teleScore.climbAttempt": 1,
                "teleScore.climbPosition": 1,
                "teleScore.playStyle": 1
>>>>>>> 44d1d118c7afd2d9266a9a7ad1b98e4a87fcff05
            }
    },
    {
        $group:
            {
                "_id": "$teamNumber",
<<<<<<< HEAD
                //"totalGears": {"$sum": "$teleScore.gearTotal"},
                // "averageGears": {"$avg": "$teleScore.gearTotal"},
                // "gearPlacement": {"$addToSet": "$autoScore.placement"},
                // "autoFuelAverage": {"$avg": "$autoScore.fuelPoints"},
                // "teleFuelAverage": {"$avg": "$teleScore.fuelPoints"},;
                "teleFoul": {"$sum": "$teleScore.foul"},
                "teleVault": {"$sum": "$teleScore.vaultPoints"},
                "teleParking": {"$sum": "$teleScore.parking"},
                "autoPlace": {"$sum": "$autoScore.placement"}, 
                "teleLevi": {"$avg": "$teleScore.levitation"},
                "telePlay": {"$sum": "$teleScore.playStyle"},
                "teleTotal": {"$sum": "$teleScore.total"},
                "teleCubes": {"$sum": "$teleScore.cubes"},
                "teleAvgCubes": {"$avg": "teleScore.cubes"},
=======
                "totalTeleGears": {"$sum": "$teleScore.gearTotal"},
                "averageTeleGears": {"$avg": "$teleScore.gearTotal"},
                "autoGearAttempts": {"$sum": {"$cond": ["$autoScore.gearAttempt", 1, 0]}},
                "autoGearSucess": {"$sum": "$autoScore.gearTotal"},
                "gearPlacement": {"$addToSet": "$autoScore.placement"},
                "autoFuelAverage": {"$avg": "$autoScore.fuelPoints"},
                "teleFuelAverage": {"$avg": "$teleScore.fuelPoints"},
>>>>>>> 44d1d118c7afd2d9266a9a7ad1b98e4a87fcff05
                "autoTotal": {"$sum": "$autoScore.total"},
                //"autoAvg": {"$avg": "$autoScore.total"},
                "attemptedClimbs": {"$sum": {"$cond": ["$teleScore.climbAttempt", 1, 0]}},
                "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climbSuccess", 1, 0]}},
<<<<<<< HEAD
                //"climbPlacement": {"$addToSet": "$teleScore.climbPosition"},
=======
                "climbPlacement": {"$addToSet": "$teleScore.climbPosition"},
                "defensiveMatches": {"$sum": {"$cond": [{"$eq": ["$teleScore.playStyle", "DEFENSIVE"]}, 1, 0]}},
                "offensiveMatches": {"$sum": {"$cond": [{"$eq": ["$teleScore.playStyle", "OFFENSIVE"]}, 1, 0]}},
>>>>>>> 44d1d118c7afd2d9266a9a7ad1b98e4a87fcff05
                "matches": {"$sum": 1}
            }
    },
    {
        $out: "temp"
    }
]);