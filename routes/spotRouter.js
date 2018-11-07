const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController')

router.get('/:id', spotController.get_spot_byid);
router.post('/:id/:avail', spotController.update_spot_byid);
router.delete('/:id', spotController.delete_spot_by_id);

module.exports = router;