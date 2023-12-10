const express = require('express');
const app = express()
const port = 3000;
import ('./services/Scheduler.js')
const { sequelize } = require('./models')
const apiRouter = require('./api/routes/routes')
const bodyParser = require('body-parser')

//Make it possible to read the body of the request.
app.use(bodyParser.json());


////////////////////
//Routers are here//
////////////////////
app.use('/api', apiRouter);



//////////////////////////
//Required stuff is here//
//////////////////////////
function start() {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
        sequelize.authenticate().then(() => {
            console.log('Connection to database has been established successfully.');
        }).catch((error) => {
            console.error('Unable to connect to the database: ', error);
        });
    }

// Open index.html if the user goes to an url that doesn't exist
app.use(function(req, res) {
    res.status(404).sendFile(__dirname + '/index.html');
});

start();