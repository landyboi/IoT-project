const moment = require("moment/moment");

const modifyTimezone = (timestamp) => {
    const CET = moment.tz(timestamp, "Europe/Paris");
    const UTC = CET.clone().tz("Europe/London");

    return UTC.format();
}

module.exports = {
    modifyTimezone
}