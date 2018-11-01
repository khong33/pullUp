var express = require('express');
var router = express.Router();
var parking_controller = require('../controllers/parking_controller')



// router.get('/', function(req, res) {
//   res.render('reservation');
// });


// p_id: parking id


  
/* GET ALL PARKING LOTS NEAR CURRENT LOCATION */
router.post('/loc', function(req, res, next) {
    parking.findParkingByLocation(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  


/* PARKING*/
router.post('/', parking_controller.create_parkinglot);
router.get('/:id', parking_controller.get_parkinglot_byid);
router.delete('/:id', parking_controller.delete_parkinglot_byid);
// router.get('/long/lat', parking_controller.get_parkinglot);

module.exports = router;


