const express = require('express')
const router = express.Router();
const apiController = require('../../controllers/apicontroller');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


const checkApiKey = (type) => async (req, res, next) => {
    const apiKey = req.header('key');

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

router.get('/values', checkApiKey('client'), apiController.getValues);
router.post('/values', checkApiKey('client'), apiController.storeValues);
router.delete('/values', checkApiKey('client'), apiController.deleteValues);

router.get('/values/last30', checkApiKey('client'), apiController.getLast30DaysValues);
router.get('/values/last60', checkApiKey('client'), apiController.getLast60DaysValues);
router.get('/values/last120', checkApiKey('client'), apiController.getLast120DaysValues);

router.get('/devices', checkApiKey('admin'), apiController.getDevices);

module.exports = router;