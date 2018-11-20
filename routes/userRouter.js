const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/auth', userController.authenticateUser);
router.post('/', userController.createUser);
router.get('/:UUID', userController.getUser);
router.post('/verify', userController.verifyUser);

module.exports = router;
