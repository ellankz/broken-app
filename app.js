var express = require('express');
var app = express();
var { sequelize } = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller');

sequelize.sync();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/api/auth', user);

app.use('/api/game', require('./middleware/validate-session'));

app.use('/api/game', game);

app.use('/', (req, res, next) => {
  res
    .status(404)
    .send(`Not found. This route with method ${req.method} is not active.`);
  return;
});

app.listen(3050, function () {
  console.log('App is listening on 3050');
});
