const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');
const {
  SUCCESFULLY_AUTHENTICATED,
  PASSWORDS_NOT_MATCH,
  USER_NOT_FOUND,
  FAILED_AUTHENTICATE,
} = require('../constants/constants');

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
    let token = jwt.sign({ id: user.id }, JWT_KEY, {
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
            const token = jwt.sign({ id: user.id }, JWT_KEY, {
              expiresIn: 60 * 60 * 24,
            });
            res.json({
              user: user,
              message: SUCCESFULLY_AUTHENTICATED,
              sessionToken: token,
            });
          } else {
            res.status(502).send({ error: PASSWORDS_NOT_MATCH });
          }
        }
      );
    } else {
      res.status(403).send({ error: USER_NOT_FOUND });
    }
  } catch (err) {
    res.status(401).send({ error: FAILED_AUTHENTICATE });
  }
});

module.exports = router;
