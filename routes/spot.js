var express = require('express');
var router = express.Router();
var parking = require('../models/spot')

// s_id: spot id

  /* GET AVAILABILITY of ALL SPOTS using  PARKING_ID */
  router.get('/spots/:p_id', function(req, res, next) {
    spot.findAllByPId(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* GET AVAILABILITY of SINGLE SPOT using  SPOT_ID */
  router.get('/:s_id', function(req, res, next) {
    spot.findOneBySId(req.params.id, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* UPDATE AVAILABILTIY STATUS */
  router.put('/:s_id', function(req, res, next) {
    spot.findBySIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE BOOK */
  router.delete('/:s_id', function(req, res, next) {
    spot.findBySIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;