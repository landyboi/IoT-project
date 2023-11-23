const electricityService = require('../services/electricityPriceFetcher');


async function main() {
    try {
        const result = await electricityService.getSpecificPriceForDate('2021-03-01', '00');
        console.log('Result: ', result);
    } catch (error) {
        console.error('Error: ', error);
    }
}

main();