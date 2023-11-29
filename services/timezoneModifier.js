const moment = require('moment-timezone');

const modifyTimezone = (timestamp) => {
    const CET = moment.tz(timestamp, "Europe/Paris");
    const UTC = CET.clone().tz("Europe/London");

    return UTC.format();
}


const returnTimestampInNewTimezone = (timestamp, countryCode) => {
    const timezones = moment.tz.zonesForCountry(countryCode);

    if (timezones === null) {
        throw new Error("Invalid country code")
    }

    if (timezones.length > 1) {
        throw new Error("Multiple timezones not supported yet!")
    }

    const timezone = timezones[0];

    const originalTimestamp = moment.tz(timestamp, "Europe/London");
    const newTimestamp = originalTimestamp.clone().tz(timezone);

    return newTimestamp.format('YYYY-MM-DD HH:mm:ss');
}



module.exports = {
    modifyTimezone,
    returnTimestampInNewTimezone
}