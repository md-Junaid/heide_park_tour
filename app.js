const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const routes = require('./server/routes/index');
const connectDB = require('./server/config/db');

// load env vars
dotenv.config({ path: './server/config/config.env' });

// Connect to database
connectDB();

const PORT = process.env.PORT;

const app = express();
app.use(morgan('combined'));

// Body Parse
app.use(bodyParser.json());

// Enable cors
app.use(cors());

// Routes
app.use('/api', routes);


// Handle Production
if(process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/server/public'));

  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/server/public/index.html'));
}

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));