const express = require('express');
const router = express.Router();
const parkingController = require('../controllers/parkingController')

/* POST - create a parking lot with 5 default spots */
router.post('/', parkingController.createParkingLot);

/* GET - request parking lot object by id */
router.get('/:PUUID', parkingController.getParkingLot);

/* GET - request near by parking lots in respect to current location */
router.get('/', parkingController.findNearByParking);

/* DELETE - delete parking lot object by id */
router.delete('/:PUUID', parkingController.deleteParkingLot);

module.exports = router;