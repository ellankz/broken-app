var express = require('express');
var app = express();
var db = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller');

db.sync();

app.use(require('./middleware/validate-session'));

app.use(require('body-parser'));

app.use('/api/auth', user);
app.use('/api/game', game);

app.listen(3050, function () {
  console.log('App is listening on 3050');
});
