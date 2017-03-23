use steamworks;

db.perry.aggregate([
    {
        $project:
            {
                "teamNumber": 1,
                "autoScore.placement": 1,
                "autoScore.total": 1,
                "autoScore.fuelPoints": 1,
                "teleScore.gearTotal": 1,
                "teleScore.fuelPoints": 1,
                "teleScore.climbSuccess": 1,
                "teleScore.climbAttempt": 1,
                "teleScore.climbPosition": 1
            }
    },
    {
        $group:
            {
                "_id": "$teamNumber",
                "totalGears": {"$sum": "$teleScore.gearTotal"},
                "averageGears": {"$avg": "$teleScore.gearTotal"},
                "gearPlacement": {"$addToSet": "$autoScore.placement"},
                "autoFuelAverage": {"$avg": "$autoScore.fuelPoints"},
                "teleFuelAverage": {"$avg": "$teleScore.fuelPoints"},
                "autoTotal": {"$sum": "$autoScore.total"},
                "autoAvg": {"$avg": "$autoScore.total"},
                "attemptedClimbs": {"$sum": {"$cond": ["$teleScore.climbAttempt", 1, 0]}},
                "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climbSuccess", 1, 0]}},
                "climbPlacement": {"$addToSet": "$teleScore.climbPosition"},
                "matches": {"$sum": 1}
            }
    },
    {
        $out: "temp"
    }
]);