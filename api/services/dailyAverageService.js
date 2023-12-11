const { daily_averages:dailyAverages } = require('../../models');
const measurementService = require('./measurementService');



const getDailyAverages = async (device, dates) => {
    if (isNaN(device)) {
        throw new Error('Device has to be referenced by id!');
    }

    const resultArray = [];

    for (const date of dates) {
        try {
            const result = await dailyAverages.findAll({where: {date: date, device: device, deletedAt: null}});

            if (result.length === 0) {
                const dailyAverage = await calculateDailyAverages(device, date);
                if (!dailyAverage.success) {
                    resultArray.push(null);
                    continue;
                }
                resultArray.push(dailyAverage.data.averageValues);
                continue;
            }

            resultArray.push(result[0].averageValues);
        } catch (error) {
            throw new Error('Error calculating the daily averages for date: ' + date + '!');
        }
    }

    return {success: true, data: resultArray};
}


const calculateDailyAverages = async (device, date) => {
    if (isNaN(device)) {
        throw new Error('Device has to be referenced by id!');
    }

    try {
        const dailyMeasurements = await measurementService.getMeasurementsByDeviceFromDate(device, date);

        if (!dailyMeasurements.success) {
            return {success: false, message: 'No measurements found from date: ' + date + '!'};
        }

        const measurementsData = dailyMeasurements.data;
        const measurementsLength = measurementsData.length;

        const calculateAverage = (total, length) => {
            const average = total / length;
            return average !== 0 ? average.toFixed(2) : null;
        };

        let totalTemperature = 0;
        let totalHumidity = 0;
        let totalAirpressure = 0;
        let totalDewpoint = 0;

        measurementsData.forEach(measurement => {
            totalTemperature += measurement.temperature;
            totalHumidity += measurement.humidity;
            totalAirpressure += measurement.airpressure;
            totalDewpoint += measurement.dewpoint;
        });

        const averageTemperature = calculateAverage(totalTemperature, measurementsLength);
        const averageHumidity = calculateAverage(totalHumidity, measurementsLength);
        const averageAirpressure = calculateAverage(totalAirpressure, measurementsLength);
        const averageDewpoint = calculateAverage(totalDewpoint, measurementsLength);

        const averageValues = {
            date: date,
            averageTemperature: averageTemperature,
            averageHumidity: averageHumidity,
            averageAirpressure: averageAirpressure,
            averageDewpoint: averageDewpoint
        };

        const result = await dailyAverages.create({
            device: device,
            date: date,
            averageValues: averageValues
        });

        if (!result) {
            return {success: false, message: 'Error storing the daily averages!'};
        }

        return ( {success: true, data: result} );
    } catch (error) {
        throw new Error('Error calculating the daily averages!');
    }
}



module.exports = {
    getDailyAverages,
    calculateDailyAverages
}