const { Measurements } = require('../models')
const { Op } = require("sequelize");
const moment = require("moment");

const getValues = async (req, res) => {
    const measurements = await Measurements.findAll();
    res.status(200).json(
        {
            message: "Database search completed successfully!",
            data: measurements
        })
}

const storeValues = async (req, res) => {
    const temp = req.query.temp;
    try {
        const result = await Measurements.create({ temperature: temp });
        const storedIdNumber = result.toJSON().id;
        const savedResult = await Measurements.findOne({ where: { id: storedIdNumber } });

        if (savedResult) {
            res.status(200).json({
                message: "Data stored in the database successfully!",
                data: savedResult
            });
        } else {
            res.status(500).json({
                message: "Error storing the data to the database"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            message: "Faulty query parameters!"
        });
    }
}

const deleteValues = async (req, res) => {
    const id = req.query.id;
    try {
        const result = await Measurements.destroy( { where: { id: id } });
        console.log(result)
        const searchResult = await Measurements.findOne({ where: { id: id } });
        if (result !== 0 && !searchResult) {
            res.status(200).json({
                message: "Entry deleted successfully from the database!"
            });
        } else {
            res.status(500).json({
                message: "Error deleting entry from database"
            });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
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


module.exports = {
    getValues,
    storeValues,
    deleteValues,
    getLast30DaysValues,
    getLast60DaysValues,
    getLast120DaysValues
}