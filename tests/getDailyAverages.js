const averageService = require('../api/services/dailyAverageService.js');

async function main() {
    const result = await averageService.getDailyAverages(2, '2023-11-18');

    console.log(result);
}

main();