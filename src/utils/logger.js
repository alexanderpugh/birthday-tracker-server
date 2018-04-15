var bunyan = require('bunyan');

var logger = bunyan.createLogger({ name: 'birthday-tracker-server' });

module.exports = logger;
