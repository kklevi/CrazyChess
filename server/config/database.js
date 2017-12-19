const mongoose = require('mongoose');
require('dotenv').load();


mongoose.connect(process.env.MONGODB, {
  useMongoClient: true
});

mongoose.Promise = global.Promise;

let db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error.'));
db.once('open', () => {
  console.info('Connected to database.');
});


module.exports = db;
