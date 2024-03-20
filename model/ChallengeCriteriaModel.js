const Sequelize  = require("sequelize");
const conn = require("../config/connect");
const Criteria = require("./Criteria.js");
const Challenges = require("./ChallengesModel.js");
const {DataTypes} = Sequelize;

const ChallengeCriteria = conn.define('challengeCriteria',{
    challenge_id :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    criteria_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
});
Challenges.hasMany(ChallengeCriteria);
Criteria.hasMany(ChallengeCriteria);
ChallengeCriteria.belongsTo(Challenges, {foreignKey: 'challenge_id'});
ChallengeCriteria.belongsTo(Criteria, {foreignKey: 'criteria_id'});
conn.sync()
    .then(() => {
        console.log("La table 'challengecriteriaModel' a été créée avec succès dans la base de données.");
    })
    .catch(err => {
        console.error("Erreur lors de la création de la table 'challengecriteriaModel':", err);
    });
module.exports = ChallengeCriteria;