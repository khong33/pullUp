var express = require('express');
var router = express.Router();
var parking_controller = require('../controllers/parking_controller')



/* POST - create a parking lot with 5 default spots */
router.post('/', parking_controller.create_parkinglot);

/* GET - request parking lot object by id */
router.get('/:id', parking_controller.get_parkinglot_by_id);

/* GET - request near by parking lots in respect to current location */
router.get('/:long/:lat', parking_controller.get_parkinglot_by_coord);

/* DELETE - delete parking lot object by id */
router.delete('/:id', parking_controller.delete_parkinglot_by_id);

module.exports = router;