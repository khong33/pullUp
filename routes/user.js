var express = require('express');
var router = express.Router();
var user = require('../models/user')


  /* GET ALL USER ID */
  router.get('/', function(req, res, next) {
    user.findAllUsers(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* GET INFORMATION BY USER ID */
  router.get('/:u_id', function(req, res, next) {
    user.findInfoById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* GET RESERVATION BY USER ID */
  router.get('res/:u_id', function(req, res, next) {
    user.findReservationById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;
