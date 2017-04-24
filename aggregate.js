use steamworks;

db.pike.aggregate([
    {
        $project:
            {
                "teamNumber": 1,
                "autoScore.placement": 1,
                "autoScore.total": 1,
                "autoScore.fuelPoints": 1,
                "autoScore.gearAttempt": 1,
                "autoScore.gearTotal": 1,
                "teleScore.gearTotal": 1,
                "teleScore.fuelPoints": 1,
                "teleScore.climbSuccess": 1,
                "teleScore.climbAttempt": 1,
                "teleScore.climbPosition": 1,
                "teleScore.playStyle": 1
            }
    },
    {
        $group:
            {
                "_id": "$teamNumber",
                "totalTeleGears": {"$sum": "$teleScore.gearTotal"},
                "averageTeleGears": {"$avg": "$teleScore.gearTotal"},
                "autoGearAttempts": {"$sum": {"$cond": ["$autoScore.gearAttempt", 1, 0]}},
                "autoGearSucess": {"$sum": "$autoScore.gearTotal"},
                "gearPlacement": {"$addToSet": "$autoScore.placement"},
                "autoFuelAverage": {"$avg": "$autoScore.fuelPoints"},
                "teleFuelAverage": {"$avg": "$teleScore.fuelPoints"},
                "autoTotal": {"$sum": "$autoScore.total"},
                "autoAvg": {"$avg": "$autoScore.total"},
                "attemptedClimbs": {"$sum": {"$cond": ["$teleScore.climbAttempt", 1, 0]}},
                "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climbSuccess", 1, 0]}},
                "climbPlacement": {"$addToSet": "$teleScore.climbPosition"},
                "defensiveMatches": {"$sum": {"$cond": [{"$eq": ["$teleScore.playStyle", "DEFENSIVE"]}, 1, 0]}},
                "offensiveMatches": {"$sum": {"$cond": [{"$eq": ["$teleScore.playStyle", "OFFENSIVE"]}, 1, 0]}},
                "matches": {"$sum": 1}
            }
    },
    {
        $out: "temp"
    }
]);