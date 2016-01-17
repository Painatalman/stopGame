var express = require('express');
var router = express.Router();

/* GET GAME page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'GAME ON' });
});

module.exports = router;
