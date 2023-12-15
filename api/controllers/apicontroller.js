const measurementService = require("../services/measurementService");
const subscriberService = require("../services/subscriberService");
const deviceService = require("../services/deviceService");
const electricityPriceService = require("../services/electricityPriceService");
const dailyAverageService = require("../services/dailyAverageService");



// Measurement Related Functions //
const getMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
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
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await measurementService.storeMeasurement(temperature, humidity, airpressure, dewpoint, measuredAt, device);

        if (!result.success && result.message === 'Device not found!') {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json({
            message: "New measurement added successfully!",
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
};


const deleteMeasurement = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await measurementService.deleteMeasurement(id);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json({
            message: result.message
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
};


const getLast5MeasurementsFromDevice = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await measurementService.getLast5MeasurementsFromDevice(id);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            }
        );
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getLast30DaysMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getLast30DaysMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getLast60DaysMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getLast60DaysMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getLast120DaysMeasurements = async (req, res) => {
    try {
        const result = await measurementService.getLast120DaysMeasurements();

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getMeasurementsByDevice = async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await measurementService.getMeasurementsByDevice(id)

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getMeasurementsByDeviceFromDate = async (req, res) => {
    const id = req.params.id;
    const date = req.params.date;

    if (!id || !date) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await measurementService.getMeasurementsByDeviceFromDate(id, date);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getMeasurementsByDeviceFromDateRange = async (req, res) => {
    const id = req.params.id;
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;

    if (!id || !startDate || !endDate) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await measurementService.getMeasurementsByDeviceFromDateRange(id, startDate, endDate);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getLatestMeasurementByDevice = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await measurementService.getLatestMeasurementByDevice(id);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}



// Device Related Functions //
const getDevices = async (req, res) => {
    try {
        const result = await deviceService.getDevices();

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json(
            {
                message: "Database search completed successfully!",
                data: result.data
            })
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const initializeDevice = async (req, res) => {
    const name = req.query.name;
    const country = req.query.country || 'Finland'
    const eventSupport = req.query.eventSupport || false;

    if (!name) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await deviceService.initializeDevice(name, country, eventSupport);

        if (!result.success) {
            if (result.message === 'Name already in use!') {
                return res.status(500).json({
                    message: result.message
                })
            }
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json({
            message: "New device added successfully!",
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const changeDeviceUuid = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await deviceService.changeDeviceUuid(id);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json({
            message: "New device added successfully!",
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const deleteDevice = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await deviceService.deleteDevice(id);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json({
            message: result.message
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}


const getDevicesForClient = async (req, res) => {
    try {
        const result = await deviceService.getDevicesForClient();

        if (!result.success) {
            return res.status(404).json({
                message: result.message
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
    const device = req.body.device;
    const email = req.body.email;

    if (!device || !email) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const ip = req.headers['x-forwarded-for'] || req.ip;

        const result = await subscriberService.subscribe(email, device, ip);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json({
            message: "New subscriber added successfully!",
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
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
            message: 'Subscriber deleted successfully!'
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
}



// Electricity Related Functions //
const isElectricityPriceHigh = async (req, res) => {
    try {
        const result = await electricityPriceService.isElectricityPriceHigh();

        return res.status(200).json({
            message: 'Electricity price checked successfully!',
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
    }
}



// Daily Average Related Functions //
const getDailyAverages = async (req, res) => {
    const device = req.body.device;
    const dates = req.body.dates;

    if (!device && !dates) {
        return res.status(400).json({
            message: "Faulty query parameters!"
        });
    }

    try {
        const result = await dailyAverageService.getDailyAverages(device, dates);

        if (!result.success) {
            return res.status(404).json({
                message: result.message
            });
        }

        return res.status(200).json({
            message: "Daily averages retrieved successfully!",
            data: result.data
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || 'Internal Server Error'
        });
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
    getLatestMeasurementByDevice,
    getDevices,
    initializeDevice,
    changeDeviceUuid,
    deleteDevice,
    getDevicesForClient,
    getSubscriptions,
    subscribe,
    unsubscribe,
    isElectricityPriceHigh,
    getDailyAverages
}