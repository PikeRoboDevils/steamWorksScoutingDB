var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scouting.db');

var match = {
  matchNumber: '123',
  teamNumber: '321',
  scout: 'BILLY TEST',
  results: {
    autoResults: {
      highFuel: 10,
      lowFuel: 5,
      kpa: 0.0,
      fuelPoints: 0,
      rotorPoints: 0,
      basePoints: 0,
      gearTotal: 0,
      rotorTotal: 0,
      baseLine: 0,
      totalAutoPoints: 0.0
    },
    teleOpResults: {
      highFuel: 0,
      lowFuel: 0,
      kpa: 0,
      fuelPoints: 0,
      rotorPoints: 0,
      gearTotal: 0,
      rotorTotal: 0,
      climb: 0,
      totalTelopPoints: 0.0
    },
    endGameResults: {
      red: 0,
      yellow: 0,
      tech: 0,
      foul: 0,
      malfunction: 0,
      totalHighFuel: 0,
      totalLowFuel: 0,
      totalKpa: 0,
      totalGears: 0,
      totalRotors: 0,
      totalPoints: 0.0,
      outcome: 'lose'
    }
  }
}

db.serialize(function() {
  db.run("DROP TABLE event");
  db.run("CREATE TABLE event (matchNumber TEXT, teamNumber TEXT, scout TEXT, autoHighFuel INTEGER, autoLowFuel INTEGER, autoKpa REAL, autoRotors INTEGER, autoGears INTEGER, baseline INTEGER, autoScore REAL, teleOpHighFuel INTEGER, teleOpLowFuel INTEGER, teleOpKpa REAL, teleOpRotors INTEGER, teleOpGears INTEGER, teleOpScore REAL, climb INTEGER, redCard INTEGER, yellowCard INTEGER, foul INTEGER, tech INTEGER, malfunction INTEGER, totalScore REAL, outcome TEXT)");

  db.run("INSERT INTO event VALUES ($matchNumber, $teamNumber, $scout, $autoHighFuel, $autoLowFuel, $autoKpa, $autoRotors, $autoGears, $baseline, $autoScore, $teleOpHighFuel, $teleOpLowFuel, $teleOpKpa, $teleOpRotors, $teleOpGears, $teleOpScore, $climb, $redCard, $yellowCard, $foul, $tech, $malfunction, $totalScore, $outcome)",
    {$matchNumber: match.matchNumber,
      $teamNumber: match.teamNumber,
      $scout: match.scout,
      $autoHighFuel: match.results.autoResults.highFuel,
      $autoLowFuel: match.results.autoResults.lowFuel,
      $autoKpa: match.results.autoResults.kpa,
      $autoRotors: match.results.autoResults.rotorTotal,
      $autoGears: match.results.autoResults.gearTotal,
      $baseline: match.results.autoResults.baseLine,
      $autoScore: match.results.autoResults.totalAutoPoints,
      $teleOpHighFuel: match.results.teleOpResults.highFuel,
      $teleOpLowFuel: match.results.teleOpResults.lowFuel,
      $teleOpKpa: match.results.teleOpResults.kpa,
      $teleOpRotors: match.results.teleOpResults.rotorTotal,
      $teleOpGears: match.results.teleOpResults.gearTotal,
      $teleOpScore: match.results.teleOpResults.totalTelopPoints,
      $climb: match.results.teleOpResults.climb,
      $redCard: match.results.endGameResults.red,
      $yellowCard: match.results.endGameResults.yellow,
      $foul: match.results.endGameResults.foul,
      $tech: match.results.endGameResults.tech,
      $malfunction: match.results.endGameResults.malfunction,
      $totalScore: match.results.endGameResults.totalPoints,
      $outcome: match.results.endGameResults.outcome});
});

db.close(function() {
  console.log('Closed.');
});
