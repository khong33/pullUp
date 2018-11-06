const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller')

router.post('/register', userController.createUser);
router.get('/:UUID', userController.showProfile);

module.exports = router;
