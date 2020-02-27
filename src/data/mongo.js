
const mongoose = require('mongoose');
const dotenv = require('dotenv')
const  logger  = require('../lib/logger.js');

dotenv.config();
const dbURL = process.env.MONGO_DB;
mongoose.Promise = require('bluebird');
mongoose.connect(dbURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,

});
mongoose.connection.on('connected', () => {
    logger.info(`mongoose connected to ${dbURL}`);
});
mongoose.connection.on('error', (err) => {
    logger.error(`mongoose connection error: ${err}`);
});
module.exports = mongoose;
