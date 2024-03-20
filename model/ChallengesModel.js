const { Sequelize } = require("sequelize");
const conn = require("../config/connect.js");
const Users = require("./UserModels.js");
const { DataTypes } = Sequelize;

const Challenges = conn.define(
  "challenges",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    description :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    deadline:{
        type: DataTypes.TIME,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    organizer_user_id :{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
});
Users.hasMany(Challenges);
Challenges.belongsTo(Users, {foreignKey: 'organizer_user_id'});
conn.sync()
    .then(() => {
        console.log("La table 'Challenges' a été créée avec succès dans la base de données.");
    })
    .catch(err => {
        console.error("Erreur lors de la création de la table 'Challenges':", err);
    });
module.exports = Challenges;
