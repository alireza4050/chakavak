const envvar = require('envvar');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const config = {
  port: envvar.number('PORT', 3030),
  env: envvar.oneOf('NODE_ENV', ['production', 'development', 'test'], 'production'),
  dbUrl: envvar.string('DB_URL', 'mongodb://localhost/test'),
  session: {
    secret: envvar.string('SESSION_SECRET', Math.random().toString(16).substring(2)),
    resave: true,
    saveUninitialized: true,
    cookie: { secure: 'auto' },
  },
};

exports.config = config;

exports.configApp = function configApp(app) {
  if (config.env === 'production') {
    config.session.store = new MongoStore({ mongooseConnection: mongoose.connection });
    app.set('x-powered-by', false);
    app.set('trust proxy', true);
  }
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      app.set(key, config[key]);
    }
  }
};
