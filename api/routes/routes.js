const express = require('express')
const router = express.Router();
const apiController = require('../controllers/apicontroller');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const checkApiKey = (type) => async (req, res, next) => {
    const apiKey = req.header('key');

    if (!process.env.API_KEY_CLIENT || !process.env.API_KEY_ADMIN) {
        return res.status(500).json({
            message: 'API keys not set'
        });
    }

    if (apiKey === process.env.API_KEY_CLIENT && type === 'client') {
        return next();
    }

    if (apiKey === process.env.API_KEY_ADMIN && type === 'admin') {
        return next();
    }

    return res.status(401).json({
        message: 'Invalid API key'
    });
};

router.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Welcome to SilentThunderstorm API :)'
        }
    );
});

// Measurements Routes here
router.get('/values', checkApiKey('client'), apiController.getMeasurements);
router.post('/values', checkApiKey('client'), apiController.storeMeasurement);
router.delete('/values', checkApiKey('client'), apiController.deleteMeasurement);
router.get('/values/latest', checkApiKey('client'), apiController.getLatestMeasurementByDevice);

router.get('/values/last30', checkApiKey('client'), apiController.getLast30DaysMeasurements);
router.get('/values/last60', checkApiKey('client'), apiController.getLast60DaysMeasurements);
router.get('/values/last120', checkApiKey('client'), apiController.getLast120DaysMeasurements);

router.get('/values/:id', checkApiKey('client'), apiController.getMeasurementsByDevice);
router.get('/values/:id/:date', checkApiKey('client'), apiController.getMeasurementsByDeviceFromDate);
router.get('/values/:id/:startDate/:endDate', checkApiKey('client'), apiController.getMeasurementsByDeviceFromDateRange);



// Devices Routes here
router.get('/devices', checkApiKey('admin'), apiController.getDevices);
router.delete('/devices', checkApiKey('admin'), apiController.deleteDevice);
router.post('/devices/initialize', checkApiKey('client'), apiController.initializeDevice);
router.patch('/devices/uuid', checkApiKey('admin'), apiController.changeDeviceUuid);
router.get('/devices/client', checkApiKey('client'), apiController.getDevicesForClient);



// Subscriptions Routes here
router.get('/subscriptions', checkApiKey('admin'), apiController.getSubscriptions);
router.post('/subscribe', checkApiKey('client'), apiController.subscribe);
router.delete('/unsubscribe', checkApiKey('client'), apiController.unsubscribe);



// Electricity Routes here
router.get('/electricity', checkApiKey('client'), apiController.isElectricityPriceHigh);



module.exports = router;