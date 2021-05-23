const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config');
const {
  ERROR_NOT_AUTHORIZED,
  ERROR_NO_TOKEN,
} = require('../constants/constants');
const User = require('../models/user')(require('../db'));

module.exports = function (req, res, next) {
  if (req.method == 'OPTIONS') {
    next();
  } else {
    const sessionToken = req.headers.authorization;
    if (!sessionToken)
      return res.status(403).send({ auth: false, message: ERROR_NO_TOKEN });
    else {
      jwt.verify(sessionToken, JWT_KEY, {}, (err, decoded) => {
        if (decoded) {
          User.findOne({ where: { id: decoded.id } }).then(
            (user) => {
              console.log('user', user, user.id);
              req.user = user;
              console.log(`user: ${user}`);
              next();
            },
            function () {
              res.status(401).send({ error: ERROR_NOT_AUTHORIZED });
            }
          );
        } else {
          res.status(400).send({ error: ERROR_NOT_AUTHORIZED });
        }
      });
    }
  }
};
