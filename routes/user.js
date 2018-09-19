var express = require('express');
var router = express.Router();
var user = require('../models/user')
var reservation = require('../models/reservation')

  /* GET ALL USER ID */
  router.get('/', function(req, res, next) {
    user.findAllUsers(function (err, info) {
      if (err) return next(err);
      res.json(info);
    });
  });

  
  /* GET INFORMATION BY USER ID */
  router.get('/:u_id', function(req, res, next) {
    user.findInfoById(req.params.u_id, function (err, info) {
      if (err) return next(err);
      console.log(info)
      res.render('profile.ejs', info.Item);
    });
  });


  /* GET RESERVATION BY USER ID */
  router.get('/res/:u_id', function(req, res, next) {
    user.findReservationById(req.params.u_id, function (err, info) {
      if (err) return next(err);
      var infoObj = JSON.parse(JSON.stringify(info, null, 2));

      // Calling the reservation findById
      reservation.findById(infoObj.Item.r_id, function(err, info) {
        if (err) return next(err);
        res.render('reservation.ejs', info.Item)
      });
    });
  });

module.exports = router;
