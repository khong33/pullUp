const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


router.get('/:RUUID', reservationController.readReservation);
router.post('/', reservationController.createReservation);
/*
    SUUID
    DATE
    TIME
    UUID
*/
router.delete('/:RUUID', reservationController.deleteReservation);


module.exports = router;