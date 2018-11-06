const express = require('express');
const indexController = require('../controllers/index_controller');
const router = express.Router();

router.get('/', indexController.showLogin);
router.post('/login', indexController.attemptLogin);
router.get('/about', indexController.showAbout);

module.exports = router;
