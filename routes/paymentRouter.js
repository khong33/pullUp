const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController')

/* POST - create a transaction with requirements. Body includes SUUID, UUID, TimeSlots, Price */

router.post('/', paymentController.createTransaction);

module.exports = router;