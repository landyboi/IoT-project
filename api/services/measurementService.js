const {Measurements, Devices} = require("../../models");
const moment = require("moment/moment");
const {Op} = require("sequelize");
const { modifyTimezone, returnTimestampInNewTimezone } = require("../../services/timezoneModifier");
const { checkForEvents } = require("./eventService");

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
        const measurementDevice = await Devices.findOne({ where: { uuid: device, deletedAt: null } });

        if (!measurementDevice) {
            return { success: false, message: 'Device not found!' };
        }

        if (measuredAt) {
            measuredAt = modifyTimezone(measuredAt);
        } else {
            measuredAt = new Date();
        }

        const result = await Measurements.create({
            temperature: temperature,
            device: measurementDevice.id,
            ...(humidity && { humidity: humidity }),
            ...(airpressure && { airpressure: airpressure }),
            ...(dewpoint && { dewpoint: dewpoint }),
            measuredAt: measuredAt
        });

        if (measurementDevice.eventsupport) {
            try {
                await checkForEvents(measurementDevice.id, result.dataValues);
            } catch (error) {
                console.error(error);
            }
        }

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


const getLast5MeasurementsFromDevice = async (id) => {
    try {
        const result = await Measurements.findAll({
            where: { device: id, deletedAt: null },
            order: [['measuredAt', 'DESC']],
            limit: 5
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        const countryCode = await Devices.findByPk(id).then(device => device.country);

        result.forEach(measurement => {
            if (measurement.measuredAt !== null) {
                measurement.measuredAt = returnTimestampInNewTimezone(measurement.measuredAt, countryCode);
            }
        })

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getLast30DaysMeasurements = async () => {
    try {
        const date = moment().subtract(30, 'days').toDate();
        const result = await Measurements.findAll({
            where: { createdAt: { [Op.gte]: date }, deletedAt: null },
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
            where: { createdAt: { [Op.gte]: date }, deletedAt: null },
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
            where: { createdAt: { [Op.gte]: date }, deletedAt: null },
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
            where: { device: id, deletedAt: null},
            deletedAt: null
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        const countryCode = await Devices.findByPk(id).then(device => device.country);

        result.forEach(measurement => {
            if (measurement.measuredAt !== null) {
                measurement.measuredAt = returnTimestampInNewTimezone(measurement.measuredAt, countryCode);
            }
        })

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getMeasurementsByDeviceFromDate = async (id, date) => {
    try {
        const startDate = moment(date).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const endDate = moment(date).endOf('day').format('YYYY-MM-DD HH:mm:ss');

        const result = await Measurements.findAll({
            where: {
                device: id,
                measuredAt: {
                    [Op.between]: [startDate, endDate]
                },
                deletedAt: null
            }
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        const countryCode = await Devices.findByPk(id).then(device => device.country);

        result.forEach(measurement => {
            if (measurement.measuredAt !== null) {
                measurement.measuredAt = returnTimestampInNewTimezone(measurement.measuredAt, countryCode);
            }
        })

        return {success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getMeasurementsByDeviceFromDateRange = async (id, startDate, endDate) => {
    try {
        const firstDate = moment(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const secondDate = moment(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss');

        const result = await Measurements.findAll({
            where: {
                device: id,
                measuredAt: {
                    [Op.between]: [firstDate, secondDate]
                },
                deletedAt: null
            }
        });

        if (result.length === 0) {
            return { success: false, message: 'No measurements found!' };
        }

        const countryCode = await Devices.findByPk(id).then(device => device.country);

        result.forEach(measurement => {
            if (measurement.measuredAt !== null) {
                measurement.measuredAt = returnTimestampInNewTimezone(measurement.measuredAt, countryCode);
            }
        })

        return {success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}


const getLatestMeasurementByDevice = async (id) => {
    try {
        const result = await Measurements.findOne({
            where: { device: id, deletedAt: null},
            order: [['measuredAt', 'DESC']]
        });

        if (!result) {
            return { success: false, message: 'No measurements found!' };
        }

        const countryCode = await Devices.findByPk(id).then(device => device.country);

        result.measuredAt = returnTimestampInNewTimezone(result.measuredAt, countryCode);

        return { success: true, data: result };
    } catch (error) {
        throw new Error('Error searching the database!');
    }
}



module.exports = {
    getMeasurements,
    storeMeasurement,
    deleteMeasurement,
    getLast5MeasurementsFromDevice,
    getLast30DaysMeasurements,
    getLast60DaysMeasurements,
    getLast120DaysMeasurements,
    getMeasurementsByDevice,
    getMeasurementsByDeviceFromDate,
    getMeasurementsByDeviceFromDateRange,
    getLatestMeasurementByDevice
}