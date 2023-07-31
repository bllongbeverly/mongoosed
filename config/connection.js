const mongoose = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || 'mongodb://localhost/socially';

mongoose.connect(connectionString);

module.exports = mongoose.connection;