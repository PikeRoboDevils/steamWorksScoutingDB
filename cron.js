var CronJob = require('cron').CronJob;
var count = 0;
new CronJob('0-59/5 * * * * *', function() {
	count++;
  console.log('You will see this message every second ' + count);
}, null, true, 'America/Indianapolis');