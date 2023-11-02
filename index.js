const express = require('express');
const app = express()
const port = 3000;
require('dotenv').config();
const { sequelize } = require('./models')
const apiRouter = require('./api/routes/routes')

start();

////////////////////
//Routers are here//
////////////////////
app.use('/api', apiRouter);



//////////////////////////
//Required stuff is here//
//////////////////////////

async function start() {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
        sequelize.authenticate().then(() => {
            console.log('Connection to database has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

// Open index.html if the user goes to an url that doesn't exist
app.use(function(req, res, next) {
    res.status(404).sendFile(__dirname + '/index.html');
});