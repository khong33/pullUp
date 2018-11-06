var express = require('express');
var router = express.Router();

/* GET home page. */


// landing page is login
router.get('/', function(req, res) {
  res.render('register');
});


router.get('/about', function(req, res, next) {
  res.render('about');
});


module.exports = router;
