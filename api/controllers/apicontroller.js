const { Measurements, Devices, Subscribers } = require('../../models')
const { Op } = require("sequelize");
const moment = require("moment");
const uuidCreator = require("uuid");
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();
const { sendWeatherEmail } = require("../../services/eventService");

// EVENTS HERE!
//////////////////////////////////////////////////////////////////////////////////////
eventEmitter.on('newMeasurement', async (data) => {
    data = data.result.dataValues;

    if (data.temperature <= -5) {
        sendWeatherEmail(data);
    }
});
//////////////////////////////////////////////////////////////////////////////////////

const modifyTimezone = (timestamp) => {
    const CET = moment.tz(timestamp, "Europe/Paris");
    const UTC = CET.clone().tz("Europe/London");

    return UTC.format();
}



// Measurement Related Functions //
const getValues = async (req, res) => {
    const measurements = await Measurements.findAll( { where: { deletedAt: null }});
    if (measurements.length === 0) {
        return res.status(404).json({
            message: "No subscribers found!"
        });
    } else if (measurements) {
        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: measurements
            })
    } else {
        return res.status(500).json({
            message: "Error searching the database!"
        });
    }
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
            return res.status(404).json({
                message: "Device not found"
            });
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
            eventEmitter.emit('newMeasurement', {result});

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

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!",
        });
    }

    try {
        const measurement = await Measurements.findByPk(id);

        if (!measurement) {
            return res.status(404).json({
                message: "Measurement not found"
            });
        }

        measurement.deletedAt = new Date();
        await measurement.save();

        if (measurement.deletedAt) {
            return res.status(200).json({
                message: "Entry deleted successfully from the database!"
            });
        } else {
            return res.status(500).json({
                message: "Error deleting entry from database"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
};

const getLast30DaysValues = async (req, res) => {
    try {
        const date = moment().subtract(30, 'days').toDate();
        const result = await Measurements.findAll({
            where: { createdAt: { [Op.gte]: date } },
            limit: 100,
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Database search completed successfully!",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Error searching the database!"
        });
    }
}

const getLast60DaysValues = async (req, res) => {
    try {
        const date = moment().subtract(60, 'days').toDate();
        const result = await Measurements.findAll({
            where: { createdAt: { [Op.gte]: date } },
            limit: 100,
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Database search completed successfully!",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Error searching the database!"
        });
    }
}

const getLast120DaysValues = async (req, res) => {
    try {
        const date = moment().subtract(120, 'days').toDate();
        const result = await Measurements.findAll({
            where: { createdAt: { [Op.gte]: date } },
            limit: 100,
            order: [['createdAt', 'DESC']]
        });

        return res.status(200).json({
            message: "Database search completed successfully!",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Error searching the database!"
        });
    }
}



// Device Related Functions //
const getDevices = async (req, res) => {
    const devices = await Devices.findAll( { where: { deletedAt: null }});
    if (devices.length === 0) {
        return res.status(404).json({
            message: "No devices found!"
        });
    } else if (devices) {
        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: devices
            })
    } else {
        return res.status(500).json({
            message: "Error searching the database!"
        });
    }
}

const initializeDevice = async (req, res) => {
    const name = req.query.name;
    const country = req.query.country || "FIN";

    if (!name || !country) {
        return res.status(400).json({
            message: "Faulty query parameters!",
        });
    }

    try {
        const newDevice = await Devices.create({ name: name, uuid: uuidCreator.v4(), country: country });

        if (newDevice) {
            return res.status(200).json({
                message: "New device initialized successfully!",
                data: newDevice
            });
        } else {
            return res.status(500).json({
                message: "Error initializing the device"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
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
            return res.status(404).json({
                message: "Device not found"
            });
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

const deleteDevice = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!",
        });
    }

    try {
        const device = await Devices.findByPk(id);

        if (!device) {
            return res.status(404).json({
                message: "Device not found"
            });
        }

        device.deletedAt = new Date();
        await device.save();

        if (device.deletedAt) {
            return res.status(200).json({
                message: "Device deleted successfully from the database!"
            });
        } else {
            return res.status(500).json({
                message: "Error deleting the device from the database"
            });
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || "Internal Server Error"
        });
    }
}



// Subscriber Related Functions //
const getSubscriptions = async (req, res) => {
    const subscribers = await Subscribers.findAll( { where: { deletedAt: null }});
    if (subscribers.length === 0) {
        return res.status(404).json({
            message: "No subscribers found!"
        });
    } else if (subscribers) {
        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: subscribers
            })
    } else {
        return res.status(500).json({
            message: "Error searching the database!"
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
            return res.status(404).json({
                message: "Device not found"
            });
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
                message: "Error subscribing, try again!"
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
            return res.status(404).json({
                message: "Subscriber not found"
            });
        }

        subscriber.deletedAt = Date.now();
        await subscriber.save();

        if (subscriber.deletedAt) {
            res.status(200).json({
                message: "Unsubscribed successfully!"
            });
        } else {
            res.status(500).json({
                message: "Error unsubscribing, try again!"
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
    deleteDevice,
    getSubscriptions,
    subscribe,
    unsubscribe,
    eventEmitter
}