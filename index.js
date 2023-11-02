const express = require('express');
const app = express()
const port = 3000;
require('dotenv').config();
const apiRouter = require('./api/routes/routes')



//////////////////////////
//Database stuff is here//
/////////////////////////
const conn = require('./util/sql/connect');
const connection = conn.connect;
const db = require('./util/sql/storageController');

// Try to create connection to the MySQL database and catch any errors that occur
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});



////////////////////
//Routers are here//
////////////////////
app.use('/api', apiRouter);



//////////////////////////
//Required stuff is here//
//////////////////////////
app.listen(port, () => console.log(`App listening on port ${port}!`))

// Open index.html if the user goes to an url that doesn't exist
app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + '/index.html');
});