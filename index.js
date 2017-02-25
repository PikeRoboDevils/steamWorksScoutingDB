
console.log('App started');

var bleno = require('bleno');

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:9000/steamworks';

var attendees = [];
var settings = {
  service_id: '12ab',
  characteristic_id: '34cd'
};

bleno.on('stateChange', function(state){
  if(state === 'poweredOn'){
    console.log('powered on!');
    bleno.startAdvertising('scoutingDatabaseApp', ['12ab']);
  }else{
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
                MongoClient.connect(url, function(err, db) {
                  var match = JSON.parse(data.toString());

                  var col = db.collection('westLafayette');

                  col.insertOne(match, function(err, res) {
                    if(err){
                      console.log(err);
                    }
                    console.log('New match inserted');
                    db.close();
                  });
                });

                callback(this.RESULT_SUCCESS);
              }
            })
          ]
        })
      ]);
    }
});
