const Sequelize  = require("sequelize");
const conn = require("../config/connect");
const Users = require("./UserModels.js");
const {DataTypes} = Sequelize;

const Teams = conn.define('teams',{
    team_name   :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    lead_user_id :{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
});
Users.hasMany(Teams);
Teams.belongsTo(Users, {foreignKey: 'lead_user_id'});
conn.sync()
    .then(() => {
        console.log("La table 'teams' a été créée avec succès dans la base de données.");
    })
    .catch(err => {
        console.error("Erreur lors de la création de la table 'teams':", err);
    });
module.exports = Teams;