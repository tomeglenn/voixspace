var express = require('express');
var app = express();
var twig = require('twig');
var port = process.env.PORT || 1337;

twig.cache(false);

app.set('views', 'views');
app.set('view engine', 'html');
app.engine('html', twig.__express);

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/:id', function (req, res) {
  res.render(req.params.id || 'index');
});

app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port);
});
