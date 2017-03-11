use steamworks;

db.wlPlayoffs.aggregate([
    {
        $group:
            {
            "_id": "$teamNumber",
            "totalGears": {"$sum": "$teleScore.gearTotal"},
            "averageGears": {"$avg": "$teleScore.gearTotal"},
            "autoTotal": {"$sum": "$autoScore.total"},
            "autoAvg": {"$avg": "$autoScore.total"},
            "successfulClimbs": {"$sum": {"$cond": ["$teleScore.climb", 1, 0]}},
            "matches": {"$sum": 1}
            }
    },
    {
        $out: "temp"
    }
]);