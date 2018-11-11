const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser);
router.get('/:UUID', userController.getUser);
router.put('/:UUID', userController.updateUser);

module.exports = router;
