
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
