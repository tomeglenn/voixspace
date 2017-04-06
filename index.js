var express = require('express');
var app = express();
var twig = require('twig');
var port = process.env.PORT || 1337;

var homeRouter = require('./routers/home');
var apiRouter = require('./routers/api');

twig.cache(false);
app.set('views', 'views');
app.set('view engine', 'html');
app.engine('html', twig.__express);

app.use('/public', express.static('public'));
app.use('/', homeRouter);
app.use('/api', apiRouter);

app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port);
});
