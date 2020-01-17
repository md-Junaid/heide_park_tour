const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const routes = require('./server/routes/index');
const connectDB = require('./server/config/db');
var serveStatic = require('serve-static');

// load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

var PORT = process.env.PORT;

// Morgan is an api logger, prints all the api calls in console
app.use(morgan('combined'));

// Body Parse
app.use(bodyParser.json());

// Enable cors
app.use(cors());

// Routes
app.use('/api', routes);


// Handle Production
app.use(serveStatic(__dirname + "/client/dist"));

app.listen(PORT, process.env.IP, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));