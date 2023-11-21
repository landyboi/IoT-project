const express = require('express')
const router = express.Router();
const apiController = require('../../controllers/apicontroller');
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
            message: 'Handling GET requests to API endpoint'
        }
    );
});

// Measurements Routes here
router.get('/values', checkApiKey('client'), apiController.getValues);
router.post('/values', checkApiKey('client'), apiController.storeValues);
router.delete('/values', checkApiKey('client'), apiController.deleteValues);

router.get('/values/last30', checkApiKey('client'), apiController.getLast30DaysValues);
router.get('/values/last60', checkApiKey('client'), apiController.getLast60DaysValues);
router.get('/values/last120', checkApiKey('client'), apiController.getLast120DaysValues);



// Devices Routes here
router.get('/devices', checkApiKey('admin'), apiController.getDevices);
router.post('/devices/initialize', checkApiKey('client'), apiController.initializeDevice);
router.patch('/devices/uuid', checkApiKey('admin'), apiController.changeDeviceUuid);
router.delete('/devices', checkApiKey('admin'), apiController.deleteDevice);



// Subscriptions Routes here
router.get('/subscriptions', checkApiKey('admin'), apiController.getSubscriptions);
router.post('/subscribe', checkApiKey('client'), apiController.subscribe);
router.delete('/unsubscribe', checkApiKey('client'), apiController.unsubscribe);


module.exports = router;