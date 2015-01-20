var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var modules = require('../public/static/modules/modules');
  modules.load();
  modules.query("python");
  res.render('index');
});

module.exports = router;
