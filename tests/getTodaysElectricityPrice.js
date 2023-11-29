const electricityService = require('../services/electricityPriceFetcher');


async function main() {
    try {
        const result = await electricityService.getCurrentPrice();
        console.log('Result: ', result);
    } catch (error) {
        console.error('Error: ', error);
    }
}

main();