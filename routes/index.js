var express = require('express');
var router = express.Router();
var manifest = require('../public/build-manifest');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Filters', jsBundle: manifest["main.js"], vendorjs: manifest["vendor.js"], cssBundle: manifest["main.css"] });
});

module.exports = router;
