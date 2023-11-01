const conn = require('./connect');
const connection = conn.connect;

// Create storage controller function that saves the timestamp, temperature, air pressure and humidity to the sql database
function storeValues(timestamp, temperature, airPressure, humidity) {
    async function storeValues() {
        try {
            const sql = 'INSERT INTO values (timestamp, temperature, airPressure, humidity) VALUES (?, ?, ?, ?)';
            const values = [timestamp, temperature, airPressure, humidity];
            const result = await connection.query(sql, values);
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    }
}

// Create storage controller function that gets the timestamp, temperature, air pressure and humidity from the sql database
function getValues() {
    async function getValues() {
        try {
            const sql = 'SELECT * FROM values';
            const result = await connection.query(sql);
            res.json(result);
        } catch (err) {
            res.json(err);
        }
    }
}

module.exports = { storeValues, getValues };