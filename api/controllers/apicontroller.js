const { Devices } = require('../../models')
const uuidCreator = require("uuid");
const { EventEmitter } = require('events');
const eventEmitter = new EventEmitter();
const { sendWeatherEmail } = require("../../services/eventService");
const measurementService = require("../services/measurementService");
const subscriberService = require("../services/subscriberService");


// EVENTS HERE!
//////////////////////////////////////////////////////////////////////////////////////
eventEmitter.on('newMeasurement', async (data) => {
    data = data.data.dataValues;

    if (data.temperature <= -5) {
        sendWeatherEmail(data);
    }
});
//////////////////////////////////////////////////////////////////////////////////////



// Measurement Related Functions //
const getMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
};


const storeMeasurement = async (req, res) => {
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
        const result = await measurementService.storeMeasurement(temperature, humidity, airpressure, dewpoint, measuredAt, device);

        if (!result.success && result.message === 'Device not found!') {
            return res.status(404).json({
                message: result.message,
            });
        }

        eventEmitter.emit('newMeasurement', result);

        return res.status(200).json({
            message: "New measurement added successfully!",
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
};


const deleteMeasurement = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!",
        });
    }

    try {
        const result = await measurementService.deleteMeasurement(id);

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
};


const getLast30DaysMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getLast30DaysMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
}


const getLast60DaysMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getLast60DaysMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
}


const getLast120DaysMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getLast120DaysMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
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
    try {
        const result = await subscriberService.getAllSubscribers();

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
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
        const ip = req.ip || req.socket.remoteAddress;

        const result = await subscriberService.subscribe(email, device, ip);

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json({
            message: "New subscriber added successfully!",
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
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
        const result = await subscriberService.unsubscribe(id);

        if (!result.success) {
            return res.status(404).json({
                message: result.message,
            });
        }

        return res.status(200).json({
            message: result.message,
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
}



module.exports = {
    getMeasurements,
    storeMeasurement,
    deleteMeasurement,
    getLast30DaysMeasurements,
    getLast60DaysMeasurements,
    getLast120DaysMeasurements,
    getDevices,
    initializeDevice,
    changeDeviceUuid,
    deleteDevice,
    getSubscriptions,
    subscribe,
    unsubscribe,
    eventEmitter
}