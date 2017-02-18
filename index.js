var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('scouting.db');

console.log('App started');

var bleno = require('bleno');

var attendees = [];
var settings = {
  service_id: '12ab',
  characteristic_id: '34cd'
};

bleno.on('stateChange', function(state){
  if(state === 'poweredOn'){
    bleno.startAdvertising('scoutingDatabaseApp', ['12ab']);
  }else{
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error){
    if(error){
      // error on advertise start
    }else{
      console.log('started..');
      bleno.setServices([
        new bleno.PrimaryService({
          uuid : settings.service_id,
          characteristics : [
            new bleno.Characteristic({
              value : null,
              uuid : settings.characteristic_id,
              properties : ['read', 'write'],
              onWriteRequest : function(data, offset, withoutResponse, callback){
                // var attendee = JSON.parse(data.toString());
                var match = JSON.parse(data.toString());

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


                // attendee.time_entered = Date.now();
                // attendees.push(attendee);
                console.log(match);
                callback(this.RESULT_SUCCESS);
              }
            })
          ]
        })
      ]);
    }
});
