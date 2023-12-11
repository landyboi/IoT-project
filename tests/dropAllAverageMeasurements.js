// RUN THE SCRIPT BY RUNNING: node dropAllAverageMeasurements.js

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');


const envFilePath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envFilePath });


const dbConfig = {
    host: process.env.PRODUCTION_HOST,
    user: process.env.PRODUCTION_USERNAME,
    password: process.env.PRODUCTION_PASSWORD,
    database: process.env.PRODUCTION_DATABASE
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    const dropMeasurements = 'TRUNCATE TABLE daily_averages';

    connection.query(dropMeasurements, (dropErr) => {
        if (dropErr) {
            console.error('Error dropping all data from daily_averages', dropErr);
        } else {
            console.log('All data from daily averages dropped successfully');
        }
    });

    // Close the database connection
    connection.end((err) => {
        if (err) {
            console.error('Error closing the database connection:', err);
        } else {
            console.log('Database connection closed');
        }
    });
});