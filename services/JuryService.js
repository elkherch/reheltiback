const Teams = require('../model/TeamsModel');
const Challenges = require('../model/ChallengesModel');

async function getDefiDetails(defiId) {
    try {
        const challenge = await Challenges.findByPk(defiId);
        return challenge;
    } catch (error) {
        console.error('Error getting Defi details:', error);
        throw error;
    }
}

async function getTeamDetails(teamId) {
    try {
        const team = await Teams.findByPk(teamId);
        return team;
    } catch (error) {
        console.error('Error getting team details:', error);
        throw error;
    }
}

module.exports = {
    getDefiDetails,
    getTeamDetails,
};
