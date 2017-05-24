var express = require('express');
var router = express.Router();
var upload = require("../upload");

router.post('/', upload.single('img'), function (req, res, next) {
  console.log(req.file);

  res.json({
      imageSrc: req.file.filename
  });
});

module.exports = router;
