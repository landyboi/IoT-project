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
        throw new Error('Error deleting the entry from the database!');
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


const getMeasurementsByDevice = async (id) => {
    try {
        const result = await Measurements.findAll( {
            where: { device: id},
            deletedAt: null
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getMeasurementsByDeviceFromDate = async (id, date) => {
    try {
        const startDate = moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');

        const measurements = await Measurements.findAll({
            where: {
                device: id,
                deletedAt: null
            }
        });

        let result = [];

        measurements.forEach(measurement => {
            if (moment(measurement.measuredAt).isBetween(startDate, endDate)) {
                result.push(measurement);
            } else if (measurement.measuredAt === null && moment(measurement.createdAt).isBetween(startDate, endDate)) {
                result.push(measurement);
            }
        })

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getMeasurementsByDeviceFromDateRange = async (id, startDate, endDate) => {
    try {
        const firstDate = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const secondDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');

        const measurements = await Measurements.findAll({
            where: {
                device: id,
                deletedAt: null
            }
        });

        let result = [];

        measurements.forEach(measurement => {
            if (moment(measurement.measuredAt).isBetween(firstDate, secondDate)) {
                result.push(measurement);
            } else if (measurement.measuredAt === null && moment(measurement.createdAt).isBetween(firstDate, secondDate)) {
                result.push(measurement);
            }
        })

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
    getLast120DaysMeasurements,
    getMeasurementsByDevice,
    getMeasurementsByDeviceFromDate,
    getMeasurementsByDeviceFromDateRange
}