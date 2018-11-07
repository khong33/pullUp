const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const parkingRouter = require('./routes/parkingRouter');
const spotRouter = require('./routes/spotRouter');
const reservationRouter = require('./routes/reservationRouter');

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
app.use('/parking', parkingRouter);
app.use('/spot', spotRouter);
app.use('/reservation', reservationRouter);

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



