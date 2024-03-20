const Sequelize  = require("sequelize");
const conn = require("../config/connect");
const {DataTypes} = Sequelize;

const Criteria  = conn.define('challengeCriteria',{
    nom :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    criteria_id :{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    
},{
    freezeTableName: true
});
conn.sync()
    .then(() => {
        console.log("La table 'criteria' a été créée avec succès dans la base de données.");
    })
    .catch(err => {
        console.error("Erreur lors de la création de la table 'criteria':", err);
    });
module.exports = Criteria;