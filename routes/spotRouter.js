const express = require('express');
const router = express.Router();
const spotController = require('../controllers/spotController')

router.post('/', spotController.bulkReadSpots);
router.get('/:SUUID', spotController.readSpot);
router.put('/:SUUID/:avail', spotController.updateSpot);
router.delete('/:SUUID', spotController.deleteSpot);

module.exports = router;