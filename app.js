const secret = require('./config/secret');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const userController = require('./controllers/userController');
const userRouter = require('./routes/userRouter');
const parkingRouter = require('./routes/parkingRouter');
const spotRouter = require('./routes/spotRouter');
const reservationRouter = require('./routes/reservationRouter');
const cors = require('cors');
const jwt = require('jsonwebtoken');

let app = express();
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  let token = req.query.token || req.headers['x-access-token'] || req.headers.token;
  let UUID = req.query.UUID || req.headers.uuid;

  if (req.url === '/auth' || req.url === '/registration') {
    next();
  } else if (!token || !UUID) {
    // check header or url parameters or post parameters for token
    return res.status(403).send({ 
      success: false, 
      message: 'Token and UUID are required in the header' 
    });
  } else {
    // verifies secret and checks exp
    jwt.verify(token, secret.API_KEY, function(err, decoded) {
      if (err) {
        return res.status(403).send({
          success: false,
          message: 'Failed to authenticate token.'
        });
      }
      if (decoded.UUID != UUID) {
        return res.status(403).send({
          success: false,
          message: 'Wrong UUID for the given token.'
        });
      }
      req.decoded = decoded;
      next();
    });
  }
});

// Before Authentication
app.post('/auth', userController.authenticateUser);
app.post('/registration', userController.createUser);

// Post Authentication
app.use('/user', userRouter);
app.use('/parking', parkingRouter);
app.use('/spot', spotRouter);
app.use('/reservation', reservationRouter);

// catch 404 and forward to error handler
app.use(function(err, req, res, next) {
  res.status(500).send(err);
});

app.listen(process.env.PORT || 3000);
module.exports = app;