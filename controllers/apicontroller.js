const { Measurements, Devices, Subscribers } = require('../models')
const { Op } = require("sequelize");
const moment = require("moment");
const uuidCreator = require("uuid");
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();
const { sendWeatherEmail } = require("../services/eventService");

// EVENTS HERE!
//////////////////////////////////////////////////////////////////////////////////////
eventEmitter.on('newMeasurement', async (data) => {
    if (data.temperature <= -5) {
        sendWeatherEmail(data);
    }
});
//////////////////////////////////////////////////////////////////////////////////////


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
        if (result) {
            eventEmitter.emit('newMeasurement', { temperature, humidity, airpressure, dewpoint, measuredAt, device });

            res.status(200).json({
                message: "Data stored in the database successfully!",
                data: result
            });
        } else {
            res.status(500).json({
                message: "Error storing the entry in the database!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

const deleteValues = async (req, res) => {
    const id = req.query.id;
    try {
        const measurement = await Measurements.findByPk(id);
        measurement.deletedAt = Date.now();
        await measurement.save();
        const result = await Measurements.findByPk(id);

        if (result.deletedAt !== null) {
            res.status(200).json({
                message: "Entry deleted successfully from the database!"
            });
        } else {
            res.status(500).json({
                message: "Error deleting entry from database"
            });
        }
    } catch (error) {
        res.status(400).json({
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

const initializeDevice = async (req, res) => {
    const name = req.query.name;

    try {
        const newDevice = await Devices.create({ name: name, uuid: uuidCreator.v4(),country: "FIN" });

        if (newDevice) {
            res.status(200).json({
                message: "New device initialized successfully!",
                data: newDevice
            });
        } else {
            res.status(500).json({
                message: "Error initializing the device"
            });
        }
    } catch (error) {
        res.status(400).json({
            message: "Faulty query parameters!"
        });
    }
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

const subscribe = async (req, res) => {
    const device = req.query.device;
    const email = req.query.email;

    if (!device || !email) {
        return res.status(400).json({
            message: "Faulty query parameters!",
        });
    }

    try {
        const deviceResult = await Devices.findByPk(device);
        if (!deviceResult) {
            throw new Error("Device not found");
        }

        const result = await Subscribers.create({
            email: email,
            ip_address: req.ip || req.socket.remoteAddress,
            device: deviceResult.id,
        })

        if (result) {
            res.status(200).json({
                message: "New subscriber added successfully!",
                data: result
            });
        } else {
            res.status(500).json({
                message: "Error subscribing!"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message || "Internal Server Error",
        });
    }
}

const unsubscribe = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!",
        });
    }

    try {
        const subscriber = await Subscribers.findByPk(id);
        if (!subscriber) {
            throw new Error("Subscriber not found");
        }

        subscriber.deletedAt = Date.now();
        await subscriber.save();

        const result = await Subscribers.findByPk(id);

        if (result.deletedAt !== null) {
            res.status(200).json({
                message: "Unsubscribed successfully!"
            });
        } else {
            res.status(500).json({
                message: "Error unsubscribing!"
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
    initializeDevice,
    changeDeviceUuid,
    subscribe,
    unsubscribe,
    eventEmitter
}