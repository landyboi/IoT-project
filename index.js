const express = require('express');
const app = express()
const path = require('path');
const port = 3000;
const cors = require('cors');
import ('./services/Scheduler.js')
const { sequelize } = require('./models')
const apiRouter = require('./api/routes/routes')
const bodyParser = require('body-parser')

app.use(cors());

//Make it possible to read the body of the request.
app.use(bodyParser.json());



/////////////////////
//Routers are here//
////////////////////
app.use('/api', apiRouter);



///////////////////////////
//Frontend stuff is here//
//////////////////////////
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
});



///////////////////////////
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

start();