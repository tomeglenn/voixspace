var express = require('express');
var router = express.Router();

router.get('/message', function (req, res) {
  var messages = [
    [
      { message: 'Believe you can and you\'re halfway there.', date: Date.now() },
      { message: 'Awesome quote!!', date: Date.now() },
    ],
    [
      { message: 'Hey guys!!! This is cool!', date: Date.now() }
    ],
    [
      { message: 'Hello world!!!!!!', date: Date.now() }
    ]
  ];

  var message = messages[Math.floor(Math.random() * messages.length)];
  res.json(message);
});

router.post('/message', function (req, res) {
  res.status(200).json({ status: 'success' });
});

router.put('/message/:id', function (req, res) {
  res.status(200).json({ status: 'success' });
});

module.exports = router;
