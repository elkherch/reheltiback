const Teams = require('../model/TeamsModel');

class TeamService {
    async createTeams(teamData) {
        try {
            const teams = await  Teams.create(teamData);
            return teams;
        } catch (error) {
            console.error('Erreur lors de la création de utilisateur :', error);
            throw error;
        }
    }
    async getAllTeams() {
        try {
            const teams = await Teams.findAll();
            return teams;
        } catch (error) {
            console.error('Erreur :', error);
            throw error;
        }
    }

    async getTeamById(teamId) {
        try {
            const teams = await Teams.findByPk(teamId);
            if (!teams) {
                throw new Error('Utilisateur non trouvé');
            }
            return teams;
        } catch (error) {
            console.error(`Erreur  ${teamId} :`, error);
            throw error;
        }
    }

    async updateTeams(teamId, teamData) {
        try {
            const team = await Teams.findByPk(teamData);
            if (!team) {
                throw new Error('Teams non trouvé');
            }
            await team.update(teamDataData);
            return team;
        } catch (error) {
            console.error(`Erreur  ${teamId} :`, error);
            throw error;
        }
    }

    async deleteTeam(teamId) {
        try {
            const team = await Teams.findByPk(teamId);
            if (!team) {
                throw new Error('Teams non trouvé');
            }
            await team.destroy();
            return team;
        } catch (error) {
            console.error(`Erreur ${teamId} :`, error);
            throw error;
        }
    }
}

module.exports = new TeamService();