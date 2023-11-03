// RUN THE SCRIPT BY RUNNING: node PrintAllTables.js

const mysql = require('mysql');
const dotenv = require('dotenv');
const path = require('path');


const envFilePath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envFilePath });

// Replace these with your own database credentials
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the MariaDB database');

    // Query to retrieve the list of tables in the database
    const query = 'SHOW TABLES';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving tables:', err);
        } else {
            console.log('Tables in the database:');
            results.forEach((row) => {
                const tableName = row[Object.keys(row)[0]];
                console.log(tableName);
            });
        }

        // Close the database connection
        connection.end((err) => {
            if (err) {
                console.error('Error closing the database connection:', err);
            } else {
                console.log('Database connection closed');
            }
        });
    });
});
