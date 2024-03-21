// const mysql = require('mysql');

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('scc', 'admin', 'sscsupnum', {
  host: 'ssc.cluster-c7428qqac1q4.eu-west-3.rds.amazonaws.com',
  dialect: 'mysql',
  port:"3306",
  dialectOptions: {
    connectTimeout: 60000 
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données réussie');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

module.exports = sequelize;