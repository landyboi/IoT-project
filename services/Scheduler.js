const schedule = require('node-schedule');
const { sendDailyWeatherEmail } = require('./emailService');

const rule = new schedule.RecurrenceRule();

rule.hour = 7;

function main() {
    schedule.scheduleJob(rule, function () {
        sendDailyWeatherEmail();
    });
}

main();