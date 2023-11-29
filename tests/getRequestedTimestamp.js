const { returnTimestampInNewTimezone } = require('../services/timezoneModifier')

async function main() {
    const result = returnTimestampInNewTimezone('2023-08-13 12:00:00', 'FI');

    console.log(result)
}

main();