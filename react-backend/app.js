var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


// Router variables to connect the different routes to the main backend
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchesRouter = require('./routes/matches');
var startRouter = require('./routes/start');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


////
// Our routes: the url does /___/get request url within the routes folder
// ex. to find all users we will now do
// /matches/all-users
////
app.use('/', indexRouter);
//app.use('/users', usersRouter);
app.use('/start', startRouter);
app.use('/matches', matchesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.listen(3001, () => {
  console.log("Server is up and listening on 3001...")
})

module.exports = app;
