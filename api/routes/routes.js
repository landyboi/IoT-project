const express = require('express')
const router = express.Router();
const apiController = require('../../controllers/apicontroller');

router.get('/', (req, res) => {
    res.status(200).json(
        {
            message: 'Handling GET requests to API endpoint'
        }
    );
});

router.get('/values', apiController.getValues);
router.post('/values', apiController.storeValues);
router.delete('/values', apiController.deleteValues);

router.get('/values/last30', apiController.getLast30DaysValues);
router.get('/values/last60', apiController.getLast60DaysValues);
router.get('/values/last120', apiController.getLast120DaysValues);

router.get('/device/initialize', apiController.initializeDevice);

module.exports = router;