var express = require('express');
var router = express.Router();
var spot_controller = require('../controllers/spot_controller')







router.get('/:id', spot_controller.get_spot_byid);
router.post('/:id/:avail', spot_controller.update_spot_byid);

module.exports = router;