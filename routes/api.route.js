var express = require('express')
var router = express.Router()

var pullupAPI = require('./api/pullup.route')

router.use('/pullup', pullupAPI);


module.exports = router;