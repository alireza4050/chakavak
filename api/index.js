const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const connectHistoryFallback = require('connect-history-api-fallback');
const { configApp } = require('./config');

const app = express();

configApp(app);
if (app.get('env') === 'development') app.use(logger('dev'));
else app.use(logger('tiny'));
require('./setup/mongoose');

app.use(session(app.get('session')));
require('./setup/passport')(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', require('./setup/routes'));

app.use(connectHistoryFallback());

// catch async errors
app.use(async (err, req, res, next) => {
  if (err) res.end(err.message);
  next(err);
});

module.exports = app;
