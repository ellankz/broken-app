const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { sequelize, DataTypes } = require('../db');
const User = require('../models/user')(sequelize, DataTypes);

router.post('/signup', async (req, res) => {
  try {
    await User.create({
      full_name: req.body.user.full_name,
      username: req.body.user.username,
      passwordHash: bcrypt.hashSync(req.body.user.password, 10),
      email: req.body.user.email,
    });
    let token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
      expiresIn: 60 * 60 * 24,
    });
    res.status(200).json({
      user: user,
      token: token,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post('/signin', async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.user.username },
    });
    if (user) {
      bcrypt.compare(
        req.body.user.password,
        user.passwordHash,
        function (err, matches) {
          if (matches) {
            const token = jwt.sign({ id: user.id }, 'lets_play_sum_games_man', {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: 'Successfully authenticated.',
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: 'Passwords do not match.' });
          }
        }
      );
    } else {
      res.status(403).send({ error: 'User not found.' });
    }
  } catch (err) {
    res.status(401).send({ error: 'Failed to authenticate' });
  }
});

module.exports = router;
