var fs = require('fs');
var mime = require('mime');
var crypto = require('crypto');
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var destinationPath = 'uploads';

    if (fs.existsSync(destinationPath)) {
      cb(null, destinationPath);
    } else {
      fs.mkdir(destinationPath, function (err) {
        if (err) {
          cb(err);
        } else {
          cb(null, destinationPath);
        }
      });
    }

  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

module.exports = multer({ storage: storage });