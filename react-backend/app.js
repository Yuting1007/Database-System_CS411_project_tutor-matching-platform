var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var Addition = require("./models/addition");

// Router variables to connect the different routes to the main backend
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var matchesRouter = require('./routes/matches');
var startRouter = require('./routes/start');
var settingsRouter = require('./routes/settings');
var ratingsRouter = require('./routes/ratings');
var additionRouter = require('./routes/addition');

//not sure if we need a router for home page
//var homeRouter = require('./routes/home');

//connect to mongoBD dbs
//mongoose.connect("mongodb://localhost:27017/addition",  {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect("mongodb://heroku_36pmj3h2:utoak6glqlmi9al4d6pbkj0l4c@ds057214.mlab.com:57214/heroku_36pmj3h2", {useNewUrlParser: true, useUnifiedTopology: true});

var app = express();
app.use(express.static(path.join(__dirname, '/client/build')))
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

// -app.get('/', function (req, res) {})
// +app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
//   });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//app.use(express.static(path.join(__dirname, 'public')));  //THIS IS THE ORIGINAL

//app.use('/', express.static(path.join(__dirname, '/client/build')));

// // ================================= ADDITIONAL PORTION BEGIN =====================================
// // Serve static files from the React frontend app
//  app.use(express.static(path.join(__dirname, '../client/build')))

// // AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/../client/build/index.html'))
// })
// // ======================================== ADDITIONAL PORTION END =====================================



////
// Our routes: the url does /___/get request url within the routes folder
// ex. to find all users we will now do
// /matches/all-users
////
app.use('/', indexRouter);
app.use('/start', startRouter);
app.use('/matches', matchesRouter);
app.use('/settings', settingsRouter);
app.use('/ratings', ratingsRouter);
app.use('/addition', additionRouter);

//not sure if we need a router for home page
//app.use('/home', homeRouter);

//code for testing wether we connecting to MongoDB
// Addition.create(
//      {
//          link: "https://www.reddit.com/r/UIUC/comments/9iha41/cs_411_with_abdu_alawini/", 
//          major: "Computer Science",
//          level: "400", 
//          course: "411"
         
//      },
//      function(err, info){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED info: ");
//           console.log(info);
//       }
//     });

// Addition.find({}, function(err, info){
//     if(err){
//       console.log(err);
//     } else {
//       console.log(info);
//     }
// });

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




const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log("Server is up and listening on test...")
})



module.exports = app;
