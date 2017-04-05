var express = require('express');
var app = express();
var port = process.env.PORT || 1337;

app.get('/', function (req, res) {
  res.send('Hello, world!');
});

app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port);
});
