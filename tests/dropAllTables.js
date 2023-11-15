// RUN THE SCRIPT BY RUNNING: node dropAllTables.js

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

    console.log('Connected to the MariaDB database');


    const query = 'SHOW TABLES';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving tables:', err);
        } else {
            const dropMeasurements = 'DROP TABLE Measurements';
            const dropDevices = 'DROP TABLE Devices';

            connection.query(dropMeasurements, (dropErr) => {
                if (dropErr) {
                    console.error('Error dropping table Measurements', dropErr);
                } else {
                    console.log('Table Measurements dropped successfully');
                }
            });

            connection.query(dropDevices, (dropErr) => {
                if (dropErr) {
                    console.error('Error dropping table Devices', dropErr);
                } else {
                    console.log('Table Devices dropped successfully');
                }
            });

            results.forEach((row) => {
                const tableName = row[Object.keys(row)[0]];
                const dropQuery = `DROP TABLE \`${tableName}\``;
                connection.query(dropQuery, (dropErr) => {
                    if (dropErr) {
                        console.error(`Error dropping table ${tableName}:`, dropErr);
                    } else {
                        console.log(`Table ${tableName} dropped successfully`);
                    }
                });
            });

            // Close the database connection
            connection.end((err) => {
                if (err) {
                    console.error('Error closing the database connection:', err);
                } else {
                    console.log('Database connection closed');
                }
            });
        }
    });

});