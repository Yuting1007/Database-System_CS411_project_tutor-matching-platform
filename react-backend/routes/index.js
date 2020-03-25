var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("at home page!");
  res.render('index', { title: 'Express test' });
});

module.exports = router;
