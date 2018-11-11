var express = require('express');
var router = express.Router();
var parkingController = require('../controllers/parkingController')



/* POST - create a parking lot with 5 default spots */
router.post('/', parkingController.createParkingLot);

/* GET - request parking lot object by id */
router.get('/:puuid', parkingController.getParkingLot);

/* GET - request near by parking lots in respect to current location */
router.get('/:lon/:lat', parkingController.findNearByParking);

/* DELETE - delete parking lot object by id */
router.delete('/:puuid', parkingController.deleteParkingLot);

// router.post('/:puuid/:suuid', parkingController.createReservation);

module.exports = router;