use steamworks;

var result = db.Plainfield.aggregate([

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
                "teleScore.exchangeCube": 1,
                "teleScore.fouls": 1,
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
                "avgAutoRun": {"$avg": "$autoScore.autoRun"},
                "autoPlacement": {"$addToSet": "$autoScore.placement"}, 
                "avgTeleCubes": {"$avg": "teleScore.cubes"},  
                "avgVaultPoints": {"$avg": "$teleScore.vaultPoints"},
                "fouls": {"$addToSet": "$teleScore.fouls"},
                "avgExchangePoints": {"$avg": "teleScore.exchangeCube"},
                
 
                "breakdowns": {"$sum": "$teleScore.breakdown"},
              
                "levitate": {"$sum": "$teleScore.levitation"},
                "playStyle": {"$addToSet": "$teleScore.playStyle"},
                
               
                "attemptedClimbs": {"$sum": {"$cond": ["$teleScore.climbAttempt", 1, 0]}},
                "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climbSuccess", 1, 0]}},
                "matches": {"$sum": 1}
            }
    }

]);

db.temp.insert(result.result);
