const Sequelize  = require("sequelize");
const conn = require("../config/connect");
const Teams = require('./TeamsModel.js');
const Challenge = require('./ChallengesModel.js');
const {DataTypes} = Sequelize;

const Submissions = conn.define('submissions',{
    team_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    challenge_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    file_path:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    submitted_at :{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
},{
    freezeTableName: true
});
Teams.hasMany(Submissions);
Challenge.hasMany(Submissions);
Submissions.belongsTo(Challenge, {foreignKey: 'challenge_id'});
Submissions.belongsTo(Teams, {foreignKey: 'team_id'});
conn.sync()
    .then(() => {
        console.log("La table 'submission' a été créée avec succès dans la base de données.");
    })
    .catch(err => {
        console.error("Erreur lors de la création de la table 'submission':", err);
    });
module.exports= Submissions;