'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  PORT: process.env.PORT
})
