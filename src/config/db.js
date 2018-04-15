const mongoose = require('mongoose');

const { MONGO_URL } = require('./keys');

mongoose.Promise = global.Promise;

mongoose.connect(MONGO_URL, {
  useMongoClient: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
