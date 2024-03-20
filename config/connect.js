// const mysql = require('mysql');

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('scc', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

module.exports = sequelize;