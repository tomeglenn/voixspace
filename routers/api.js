var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Message = require('../models/message');
var profanity = require('profanity-censor');

router.use(function (req, res, next) {
  if (!mongoose.connection.readyState) {
    return res.status(200).json({
      '_id': '1234567890',
      '__v': 1,
      'messages': [
        { 'body': 'This is a dummy response.', date: Date.now() }
      ]
    });
  }

  return next();
});

router.get('/message', function (req, res) {
  Message.random(function (err, message) {
    if (err) {
      return console.log('ERROR: ' + err);
    }

    return res.json(message);
  });
});

router.post('/message', function (req, res) {
  var message = new Message();
  message.messages.push({ body: profanity.filter(req.body.message) });

  message.save(function (err, message) {
    if (err) {
      return res.status(400).json({ status: 'error', message: err });
    }

    return res.status(200).json(message);
  });
});

router.put('/message/:id', function (req, res) {
  var message = Message.findOne({ _id: req.params.id }, function (err, message) {
    if (err) {
      return res.status(404).json({ status: 'error', message: err });
    }

    message.messages.push({ body: profanity.filter(req.body.message) });
    message.save(function (err, message) {
      if (err) {
        return res.status(400).json({ status: 'error', message: err });
      }

      return res.status(200).json(message);
    });
  });
});

module.exports = router;
