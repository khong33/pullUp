const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const parkingRouter = require('./routes/parkingRouter');
const spotRouter = require('./routes/spotRouter');
const reservationRouter = require('./routes/reservationRouter');
const cors = require('cors');

let app = express();
app.use(cors());
app.use(morgan('combined'));
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
  res.status(500).send(err.message);
});

app.listen(process.env.PORT || 3000);

module.exports = app;



