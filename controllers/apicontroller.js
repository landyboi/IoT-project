const { Measurements, Devices } = require('../models')
const { Op } = require("sequelize");
const moment = require("moment");
const uuidCreator = require("uuid");

const getValues = async (req, res) => {
    const measurements = await Measurements.findAll( { where: { deletedAt: null }});
    res.status(200).json(
        {
            message: "Database search completed successfully!",
            data: measurements
        })
}

const storeValues = async (req, res) => {
    let temperature, humidity, airpressure, dewpoint, measuredAt, device;

    if (req.query.temperature && req.query.device) {
        temperature = req.query.temperature;
        device = req.query.device;

        humidity = req.query.humidity || undefined;
        airpressure = req.query.airpressure || undefined;
        dewpoint = req.query.dewpoint || undefined;
        measuredAt = req.query.measuredAt || undefined;
    } else if (req.body.temperature && req.body.device) {
        temperature = req.body.temperature;
        device = req.body.device

        humidity = req.body.humidity || undefined;
        airpressure = req.body.airpressure || undefined;
        dewpoint = req.body.dewpoint || undefined;
        measuredAt = req.body.measuredAt || undefined;
    } else {
        return res.status(400).json({
            message: "Faulty parameters!"
        });
    }

    try {
        const measurementDevice = await Devices.findOne({ where: { uuid: device } });

        if (!measurementDevice) {
            throw new Error("Device not found");
        }

        const result = await Measurements.create({
            temperature: temperature,
            device: measurementDevice.id,
            ...(humidity && { humidity: humidity }),
            ...(airpressure && { airpressure: airpressure }),
            ...(dewpoint && { dewpoint: dewpoint }),
            ...(measuredAt && { measuredAt: measuredAt }),
        });

        res.status(200).json({
            message: "Data stored in the database successfully!",
            data: result
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

const deleteValues = async (req, res) => {
    const id = req.query.id;
    try {
        const measurement = await Measurements.findOne({ where: { id: id } });
        measurement.deletedAt = Date.now();
        await measurement.save();
        const result = await Measurements.findOne({ where: { id: id } });

        if (result.deletedAt !== null) {
            res.status(200).json({
                message: "Entry deleted successfully from the database!"
            });
        } else {
            res.status(400).json({
                message: "Error deleting entry from database"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Faulty query parameters!"
        });
    }
}

const getLast30DaysValues = async (req, res) => {
    try {
        const date = moment().subtract(30, 'days').toDate();
        const result = await Measurements.findAll( { where: { createdAt: { [Op.gte]: date } } } )
        res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result
            })
    } catch (error) {
        res.status(500).json({
            message: "Error searching the database!"
        });
    }
}

const getLast60DaysValues = async (req, res) => {
    try {
        const date = moment().subtract(60, 'days').toDate();
        const result = await Measurements.findAll( { where: { createdAt: { [Op.gte]: date } } } )
        res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result
            })
    } catch (error) {
        res.status(500).json({
            message: "Error searching the database!"
        });
    }
}

const getLast120DaysValues = async (req, res) => {
    try {
        const date = moment().subtract(120, 'days').toDate();
        const result = await Measurements.findAll( { where: { createdAt: { [Op.gte]: date } } } )
        res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result
            })
    } catch (error) {
        res.status(500).json({
            message: "Error searching the database!"
        });
    }
}

const getDevices = async (req, res) => {
    const devices = await Devices.findAll( { where: { deletedAt: null }});
    res.status(200).json(
        {
            message: "Database search completed successfully!",
            data: devices
        })
}

const changeDeviceUuid = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!",
        });
    }
    try {
        const device = await Devices.findByPk(id);
        if (!device) {
            throw new Error("Device not found");
        }
        const uuid = uuidCreator.v4();
        device.uuid = uuid;
        await device.save();

        const result = await Devices.findOne({ where: { uuid: uuid } });

        if (result) {
            res.status(200).json({
                message: "UUID changed successfully!",
                data: result
            });
        } else {
            res.status(500).json({
                message: "Error changing the UUID!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
}

module.exports = {
    getValues,
    storeValues,
    deleteValues,
    getLast30DaysValues,
    getLast60DaysValues,
    getLast120DaysValues,
    getDevices,
    changeDeviceUuid
}