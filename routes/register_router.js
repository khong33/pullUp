var express = require('express');
var router = express.Router();
var register = require('../models/registration_model');

 
  router.get('/', function(req, res, next) {
    res.render('register');
  });

  
  //POST signup form.
router.post('/signup', function(req, res) {
  var reg_ids = req.body.name,
      emails = req.body.email,
      lastnames = req.body.lastname,
      passwords = req.body.passwords,
      firstnames = req.body.previewAccess;
  res.send(200);
  signup(reg_ids, emails, firstnames, lastnames, passwords,);
});

module.exports = router;