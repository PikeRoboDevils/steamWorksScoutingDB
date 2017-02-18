var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scouting.db');

var eventName = 'westLafayette';

db.serialize(function() {
  var sql = "CREATE TABLE " + eventName + " (matchNumber TEXT, teamNumber TEXT, scout TEXT, autoHighFuel INTEGER, " +
    "autoLowFuel INTEGER, autoKpa REAL, autoRotors INTEGER, autoGears INTEGER, baseline INTEGER, autoScore REAL, " +
    "teleOpHighFuel INTEGER, teleOpLowFuel INTEGER, teleOpKpa REAL, teleOpRotors INTEGER, teleOpGears INTEGER, " +
    "teleOpScore REAL, climb INTEGER, redCard INTEGER, yellowCard INTEGER, foul INTEGER, tech INTEGER, " +
    "malfunction INTEGER, totalScore REAL, outcome TEXT)";
  db.run(sql, function() {
    console.log('Database created.');
  });
});

db.close(function() {
  console.log('Closed.');
});
