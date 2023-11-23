const {Measurements, Devices} = require("../../models");
const moment = require("moment/moment");
const {Op} = require("sequelize");
const { modifyTimezone } = require("../../services/timezoneModifier");


const getMeasurements = async () => {
    try {
        const measurements = await Measurements.findAll({ where: { deletedAt: null } });

        if (measurements.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        return { success: true, data: measurements };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
};


const storeMeasurement = async (temperature, humidity, airpressure, dewpoint, measuredAt, device) => {
    try {
        const measurementDevice = await Devices.findOne({ where: { uuid: device } });

        if (!measurementDevice) {
            return { success: false, message: 'Device not found!' };
        }

        if (measuredAt) {
            measuredAt = modifyTimezone(measuredAt);
        }

        const result = await Measurements.create({
            temperature: temperature,
            device: measurementDevice.id,
            ...(humidity && { humidity: humidity }),
            ...(airpressure && { airpressure: airpressure }),
            ...(dewpoint && { dewpoint: dewpoint }),
            ...(measuredAt && { measuredAt: measuredAt }),
        });

        if (result) {
            return { success: true, data: result };
        }

    } catch (error) {
        throw new Error('Error storing the entry in the database!');
    }
};


const deleteMeasurement = async (id) => {
    try {
        const measurement = await Measurements.findByPk(id);

        if (!measurement) {
            return { success: false, message: 'Measurement not found!' };
        }

        measurement.deletedAt = new Date();
        await measurement.save();

        if (measurement.deletedAt) {
            return { success: true, message: 'Measurement deleted successfully!' };
        }

    } catch (error) {
        throw new Error('Error deleting entry from database!');
    }
};


const getLast30DaysMeasurements = async () => {
    try {
        const date = moment().subtract(30, 'days').toDate();
        const result = await Measurements.findAll({
            where: { createdAt: { [Op.gte]: date } },
            limit: 200,
            order: [['createdAt', 'DESC']]
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getLast60DaysMeasurements = async () => {
    try {
        const date = moment().subtract(60, 'days').toDate();
        const result = await Measurements.findAll({
            where: { createdAt: { [Op.gte]: date } },
            limit: 200,
            order: [['createdAt', 'DESC']]
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getLast120DaysMeasurements = async () => {
    try {
        const date = moment().subtract(120, 'days').toDate();
        const result = await Measurements.findAll({
            where: { createdAt: { [Op.gte]: date } },
            limit: 200,
            order: [['createdAt', 'DESC']]
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}



module.exports = {
    getMeasurements,
    storeMeasurement,
    deleteMeasurement,
    getLast30DaysMeasurements,
    getLast60DaysMeasurements,
    getLast120DaysMeasurements
}