// *************************************************************************************** //
//                     Import All Required Modules for the Server                          //
// *************************************************************************************** //

const dotenv = require('dotenv');
const http = require('http');
const morgan = require('morgan');

const cors = require('cors');
const path = require('path');
const fs = require('fs');

const express = require('express');
const flash = require('express-flash');

// Import all the routers
const homeRouter = require('./routes/home');
const scenarioRouter = require('./routes/scenario');
const apiRouter = require('./routes/api');


// *************************************************************************************** //
//                 Add Middleware & connected all routers to the server                    //
// *************************************************************************************** //

dotenv.config({ path: './.env' });

const app = express();

// Enable morgan for development 
if (process.env.ENVIRONMENT === 'development') {
    app.use(morgan('dev'));
    console.log('Env: Develop Model -- Morgan Enabled...');
};


// Use middlewares
app.use(cors({
    // origin: 'http://localhost:3000',

}));

app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '')));


// Use routers
app.use('/home', homeRouter);
app.use('/scenario', scenarioRouter);
app.use('/api', apiRouter);
app.all('*', (req, res) => {
    res.status(404).send('URL Not Found');
});

// *************************************************************************************** //
//                     Initialize the Server & Listen for Requests                         //
// *************************************************************************************** //

const server = http.createServer(app);

const port = process.env.PORT || 3000;
app.set('port', port);
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

module.exports = server;

