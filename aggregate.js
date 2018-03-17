use mishawaka;

var result = db.tester.aggregate([

    {
        $project:
            {
                "teamNumber": 1,
                //"autoScore.total": 1,
                "autoScore.cubes": 1,
                "autoScore.autoRun": 1,
                "teleScore.breakdown": 1,
                "teleScore.vaultPoints": 1,
                "teleScore.levitation": 1,
                "teleScore.cubes": 1,
                //"teleScore.total": 1,
                "teleScore.foul": 1,
                "teleScore.parking": 1,
                "teleScore.playStyle": 1,
                "teleScore.climbSuccess": 1,
                "teleScore.climbAttempt": 1,
                "autoScore.placement": 1

            }
    },
    
    {
        $group:
            {
                "_id": "$teamNumber",
                "avgAutoCubes": {"$avg": "$autoScore.cubes"},
                "fouls": {"$sum": "$teleScore.foul"},
                "vaultPoints": {"$sum": "$teleScore.vaultPoints"},
                "avgAutoRun": {"$avg": "$autoScore.autoRun"},
                "breakdowns": {"$sum": "$teleScore.breakdown"},
                //"teleParking": {"$sum": "$teleScore.parking"},
                "autoPlacement": {"$sum": "$autoScore.placement"}, 
                "levitate": {"$sum": "$teleScore.levitation"},
                "playStyle": {"$sum": "$teleScore.playStyle"},
                //"teleTotal": {"$sum": "$teleScore.total"},
                //"teleCubes": {"$sum": "$teleScore.cubes"},
                "avgAutoCubes": {"$avg": "$autoScore.cubes"},
                "avgTeleCubes": {"$avg": "teleScore.cubes"},  
                //"autoTotal": {"$sum": "$autoScore.total"},
                "attemptedClimbs": {"$sum": {"$cond": ["$teleScore.climbAttempt", 1, 0]}},
                "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climbSuccess", 1, 0]}},
                "matches": {"$sum": 1}
            }
    }

]);

db.temp.insert(result.toArray());
