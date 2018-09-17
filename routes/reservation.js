var express = require('express');
var router = express.Router();
var reservation = require('../models/reservation')

 /* GET ALL RESERVATIONS */
 router.get('/', function(req, res, next) {
    reservation.findAll(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* GET SINGLE RESERVATION BY RESERVATION_ID */
  router.get('/:r_id', function(req, res, next) {
    reservation.findById(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


/* DELETE RESERVATION BY RESERVATION_ID */
router.delete('/reservation/:r_id', function(req, res, next) {
    reservation.findByIdAndRemove(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
        res.json(post);
    });
});

module.exports = router;