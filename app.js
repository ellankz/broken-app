require('dotenv').config();
const express = require('express');
const app = express();
const { sequelize } = require('./db');
const user = require('./controllers/usercontroller');
const game = require('./controllers/gamecontroller');
const { APP_PORT } = require('./config');

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

app.listen(APP_PORT, function () {
  console.log(`App is listening on ${APP_PORT}`);
});
