var express = require('express');
var router = express.Router();
var parkingController = require('../controllers/parkingController')



/* POST - create a parking lot with 5 default spots */
router.post('/', parkingController.create_parkinglot);

/* GET - request parking lot object by id */
router.get('/:id', parkingController.get_parkinglot_by_id);

/* GET - request near by parking lots in respect to current location */
router.get('/:long/:lat', parkingController.get_parkinglot_by_coord);

/* DELETE - delete parking lot object by id */
router.delete('/:id', parkingController.delete_parkinglot_by_id);

module.exports = router;