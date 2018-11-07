const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


router.post('/', reservationController.createReservation);
router.get('/:UUID', reservationController.readReservation);
router.put('/', reservationController.updateReservation);
router.delete('/', reservationController.deleteReservation);


module.exports = router;