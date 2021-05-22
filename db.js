const Sequelize = require('sequelize');
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
  DB_PORT,
} = require('./config');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
});

sequelize.authenticate().then(
  function success() {
    console.log('Connected to DB');
  },

  function fail(err) {
    console.log(`Error: ${err}`);
  }
);

module.exports = { sequelize, DataTypes: Sequelize };
