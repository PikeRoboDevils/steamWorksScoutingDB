var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:9000/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
  var col = db.collection('testCollection');
  col.insertOne({
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
}).then(function(r) {
    test.equal(1, r.insertedCount);
    // Finish up test
    db.close();
});
