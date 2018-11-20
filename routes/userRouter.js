const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.get('/:UUID', userController.getUser);
router.get('/verify/:UUID', userController.verifyUser);

module.exports = router;
