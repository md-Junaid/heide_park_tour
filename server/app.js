const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const routes = require('./routes/index');
const connectDB = require('./config/db');

// load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

const PORT = process.env.PORT || 8082;

const app = express();
app.use(morgan('combined'));

// Body Parse
app.use(bodyParser.json());

// Enable cors
app.use(cors());

// Routes
app.use('/api', routes);


app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));