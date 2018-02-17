use steamworks;

db.pike.aggregate([
    {
        $project:
            {
                "teamNumber": 1,
                "autoScore.total": 1,
                "teleScore.vaultPoints": 1,
                "teleScore.levitation": 1,
                "teleScore.cubes": 1,
                "teleScore.total": 1,
                "teleScore.foul": 1,
                "teleScore.parking": 1,
                "teleScore.playStyle": 1,
                "teleScore.climbSuccess": 1,
                "teleScore.climbAttempt": 1,
                "autoScore.placement": 1,
                "autoScore.placememt": 1

            }
    },
    
    {
        $group:
            {
                "_id": "$teamNumber",
                "teleFoul": {"$sum": "$teleScore.foul"},
                "teleVault": {"$sum": "$teleScore.vaultPoints"},
                "teleParking": {"$sum": "$teleScore.parking"},
                "autoPlace": {"$sum": "$autoScore.placement"}, 
                "teleLevi": {"$avg": "$teleScore.levitation"},
                "telePlay": {"$sum": "$teleScore.playStyle"},
                "teleTotal": {"$sum": "$teleScore.total"},
                "teleCubes": {"$sum": "$teleScore.cubes"},
                "teleAvgCubes": {"$avg": "teleScore.cubes"},  
                "autoTotal": {"$sum": "$autoScore.total"},
                "attemptedClimbs": {"$sum": {"$cond": ["$teleScore.climbAttempt", 1, 0]}},
                "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climbSuccess", 1, 0]}},
                "matches": {"$sum": 1}
            }
    },
    {
        $out: "temp"
    }
]);