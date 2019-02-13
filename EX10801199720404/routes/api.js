var express = require('express');
var router = express.Router();


var thingsApi = require('./api/things');


router.use('/things', thingsApi);

module.exports = router;