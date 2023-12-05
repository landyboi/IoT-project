const { daily_averages:dailyAverages } = require('../../models');
const measurementService = require('./measurementService');



const getDailyAverages = async (device, date) => {
    if (isNaN(device)) {
        throw new Error('Device has to be referenced by id!');
    }

    try {
        const result = await dailyAverages.findAll({ where: { date: date, device: device, deletedAt: null }});

        if (result.length === 0) {
            return await calculateDailyAverages(device, date);
        }

        return ( { success: true, data: result } );
    } catch (error) {
        throw new Error('Error calculating the daily averages!');
    }
}


const calculateDailyAverages = async (device, date) => {
    if (isNaN(device)) {
        throw new Error('Device has to be referenced by id!');
    }

    try {
        const dailyMeasurements = await measurementService.getMeasurementsByDeviceFromDate(device, date);

        if (!dailyMeasurements) {
            return {success: false, message: 'Error fetching the daily measurements!'};
        }

        const measurementsData = dailyMeasurements.data;
        const measurementsLength = measurementsData.length;

        if (measurementsLength === 0) {
            return {success: false, message: 'No measurements found for this day!'};
        }

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
            averageTemperature: averageTemperature,
            averageHumidity: averageHumidity,
            averageAirpressure: averageAirpressure,
            averageDewpoint: averageDewpoint
        }


        const result = await dailyAverages.create({
            device: device,
            date: date,
            ...(averageValues && {averageValues: averageValues})
        });

        if (!result) {
            return {success: false, message: 'Error calculating the daily averages!'};
        }

        return ({success: true, data: result});
    } catch (error) {
        throw new Error('Error calculating the daily averages!');
    }
}



module.exports = {
    getDailyAverages,
    calculateDailyAverages
}