const mysql = require('mysql');
// Create connection to the MySQL database
const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_SCHEMA
});

module.exports = { connect };