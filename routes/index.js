var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'bhumi' });
});


router.get('/login', function(req, res, next) {
  res.render('login', { title: 'bhumi' });
});


router.get('/availability', function(req, res, next) {
  res.render('availability', { title: 'availability' });
});


module.exports = router;
