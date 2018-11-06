const express = require('express');
const router = express.Router();
const user_controller = require('../controllers/user_controller')

router.post('/register', user_controller.create_user);
// router.get('/profile/:username', user_controller.get_user);

module.exports = router;
