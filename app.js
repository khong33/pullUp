var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var parking_router = require('./routes/parking_router');
var spot_router = require('./routes/spot_router');
var reservationRouter = require('./routes/reservation');

var test = require('./models/user')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/spot', spot_router);
app.use('/reservation', reservationRouter);
app.use('/parking', parking_router);


// catch 404 and forward to error handler

app.use(function(err, req, res, next) {
  if (!err.stack) {
    console.log(err);
    res.status(500).send(err);
  } else {
    console.error(err.stack);
    res.status(500).send(err.stack);
  }
});


// // error handler
// app.use(function(err, req, res, next) {
//   console.log("here2")
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   // res.render('error');
// });

console.log("Listening at localhost:3000")
app.listen(process.env.PORT || 3000);



module.exports = app;



