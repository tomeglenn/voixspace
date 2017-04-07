var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.render('index');
});

router.get('/:id', function (req, res, next) {
  if (req.params.id == 'favicon.ico') {
    return next();
  }
  res.render(req.params.id || 'index');
});

module.exports = router;
