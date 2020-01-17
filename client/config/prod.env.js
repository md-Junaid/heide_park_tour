'use strict'
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

module.exports = {
  NODE_ENV: '"production"',
  PORT: process.env.PORT
}
