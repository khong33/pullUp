var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var index_router = require('./routes/index_router');
var user_router = require('./routes/user_router');
var parking_router = require('./routes/parking_router');
var spot_router = require('./routes/spot_router');
var reservation_router = require('./routes/reservation_router');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index_router);
app.use('/user', user_router);
app.use('/spot', spot_router);
app.use('/reservation', reservation_router);
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

console.log("Listening at localhost:3000")
app.listen(process.env.PORT || 3000);



module.exports = app;



