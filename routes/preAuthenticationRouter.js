const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Before Authentication
router.post('/', userController.authenticateUser);
router.post('/registration', userController.createUser);

module.exports = router;