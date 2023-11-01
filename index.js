const express = require('express');
const app = express()
const port = 3000;
require('dotenv').config();
// MySQL database stuff
const conn = require('./util/sql/connect');
const connection = conn.connect;
const db = require('./util/sql/storageController');

// Try to create connection to the MySQL database and catch any errors that occur
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/api/storevalues', (req, res) => {
    const timestamp = req.body.timestamp;
    const temperature = req.body.temperature;
    const airPressure = req.body.airPressure;
    const humidity = req.body.humidity;
    db.storeValues(timestamp, temperature, airPressure, humidity);
    return "Values stored!";
});

app.get('/api/getvalues', (req, res) => {
    db.getValues();
    return "Values retrieved!";
});

//app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));
app.listen(port, () => console.log(`App listening on port ${port}!`))

// Open index.html if the user goes to an url that doesn't exist
app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + '/index.html');
});