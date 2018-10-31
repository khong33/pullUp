var express = require('express');
var router = express.Router();
var parking = require('../models/parking')



// router.get('/', function(req, res) {
//   res.render('reservation');
// });


// p_id: parking id

/* GET THE PARKING LOT BY P_ID */
router.get('/:p_id', function(req, res, next) {
    parking.findParkingById(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
/* GET ALL PARKING LOTS NEAR CURRENT LOCATION */
router.post('/loc', function(req, res, next) {
    parking.findParkingByLocation(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  

/* GET ALL PARKING LOTS NEAR CURRENT LOCATION */
router.post('/', parking_controller.parking_create_post);




module.exports = router;


