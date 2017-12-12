const mongoose = require('mongoose');
const { config } = require('../config');

// set mongoose Promise to native ES6 Promise
mongoose.Promise = Promise;

global.conn = new Promise((resolve, reject) => {
  mongoose
    .connect(config.dbUrl, { useMongoClient: true })
    .then(() => {
      resolve(mongoose.connection);
    })
    .catch(err => {
      console.error(err.message);
      reject(err);
      process.exit(1);
    });
});

