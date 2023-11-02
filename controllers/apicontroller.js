const { Measurements } = require('../models')

const getValues = async (req, res) => {
    const measurements = await Measurements.findAll();
    res.status(200).json(
        {
            message: "Database search completed succesfully!",
            data: measurements
        })
}

module.exports = {getValues}