var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var twig = require('twig');
var mongoose = require('mongoose');
var port = process.env.PORT || 1337;
var db = process.env.MONGODB_URI || 'mongodb://localhost/voix';

var homeRouter = require('./routers/home');
var apiRouter = require('./routers/api');

twig.cache(false);
app.set('views', 'views');
app.set('view engine', 'html');
app.engine('html', twig.__express);

app.use(bodyParser.json());
app.use('/public', express.static('public'));
app.use('/dist', express.static('dist'));
app.use('/', homeRouter);
app.use('/api', apiRouter);

mongoose.connect(db);

var db = mongoose.connection;
db.on('error', function () {
  console.error('Unable to connect to MongoDB. Starting server without database connection. API will NOT function.');
  listen();
});
db.once('open', function () {
  listen();
});

function listen() {
  app.listen(port, function () {
    console.log('Server listening on http://localhost:' + port);
  });
}
