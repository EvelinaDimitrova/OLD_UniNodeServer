var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');

var root = require('./routes/root');
var authRouter = require('./routes/authRouter');
var eventsRouter = require('./routes/eventsRouter');
var newsRouter = require('./routes/newsRouter');
var imagesRouter = require('./routes/imageRouter');
var studentPlanRouter = require('./routes/studentPlanRouter');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//Use the passport package in our application
app.use(passport.initialize());

//Set up routs
app.use('/', root);
app.use('/auth', authRouter);
app.use('/events', eventsRouter);
app.use('/news', newsRouter);
app.use('/images', imagesRouter);
app.use('/studentPlan', studentPlanRouter);


//error handlers

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log('evn_rrr: ' + err.status + '/'+  err.message);
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log('err: ' + err.message);
});

module.exports = app;
