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

module.exports = router;