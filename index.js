console.log('App started');

var bleno = require('bleno');
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var CronJob = require('cron').CronJob;
var fs = require('fs');

// Connection URL
var url = 'mongodb://127.0.0.1:9000/steamworks';

var attendees = [];
var settings = {
  service_id: '12ab',
  characteristic_id: '34cd'
};

var matches = [];

var job = new CronJob({
  cronTime: '0-59/30 * * * * *',
  onTick: function() {
    if(matches.length > 0) {
      MongoClient.connect(url, function(err, db) {
          console.log(matches);
        var col = db.collection('Mishawaka19');
          

        col.insertMany(matches, function(err, res) {
            col.createIndex(
                {matchNumber: 1, teamNumber: 1}, 
                {unique: true, background: true},
                function(err, indexName) {
                    if(err){
                        console.log(err);
                    }
                    console.log(matches.length + ' new matches inserted');
                    matches = [];
                    db.close();
            });
        });
      });
    } else {
      console.log('No new matches');
    }
  },
  start: true,
  timeZone:'America/Indianapolis'
});

bleno.on('stateChange', function(state){
  if(state === 'poweredOn'){
    console.log('powered on!');
    bleno.startAdvertising('scoutingDatabaseApp', ['12ab']);
  }else{
    console.log('stopped advertising');
    console.log(state);
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error){
    if(error){
      console.log(error);
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
                var match = JSON.parse(data);
                matches.push(match);
		        fs.appendFile(
			      '/var/log/robo-database.log',
			      JSON.stringify(match),
			      (err)=> err ? console.error(err):true
		        );
                callback(this.RESULT_SUCCESS);
              }
            })
          ]
        })
      ]);
    }
});
