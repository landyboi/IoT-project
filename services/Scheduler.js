const schedule = require('node-schedule');
const { sendDailyWeatherEmail } = require('./eventService');

const dailyWeatherEmail = new schedule.RecurrenceRule();

dailyWeatherEmail.hour = 5;


function main() {
    console.log('Starting scheduler...');

    schedule.scheduleJob(dailyWeatherEmail, sendDailyWeatherEmail);
}

main();