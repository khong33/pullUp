const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser);
router.post('/detail', userController.getUser);
router.post('/verify', userController.verifyUser);
router.put('/:UUID', userController.updateUser);

module.exports = router;
