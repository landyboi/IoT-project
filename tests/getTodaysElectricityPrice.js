const electricityService = require('../services/electricityPriceFetcher');


async function main() {
    try {
        const result = await electricityService.getSpecificPriceForDate('2022-01-01', 12);
        console.log('Result: ', result);
    } catch (error) {
        console.error('Error: ', error);
    }
}

main();