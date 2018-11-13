const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


router.get('/timeslots', reservationController.queryTimeSlots);
router.get('/:RUUID', reservationController.readReservation);
// router.get('/google/:keyword', googleController.getLocationInformation);
router.post('/', reservationController.createReservation);
router.delete('/:RUUID', reservationController.deleteReservation);

module.exports = router;