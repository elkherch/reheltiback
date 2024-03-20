const Challenges = require('../model/ChallengesModel');

class ChallengesService {
    async createChallenges(challengesData) {
        try {
            const challengess = await  Challenges.create(challengesData);
            return challengess;
        } catch (error) {
            console.error('Erreur lors de la création de utilisateur :', error);
            throw error;
        }
    }
    async getAllChallenges() {
        try {
            const challengess = await Challenges.findAll();
            return challengess;
        } catch (error) {
            console.error('Erreur :', error);
            throw error;
        }
    }

    async getChallengesById(challengesId) {
        try {
            const challengess = await Challenges.findByPk(challengesId);
            if (!challengess) {
                throw new Error('Utilisateur non trouvé');
            }
            return challengess;
        } catch (error) {
            console.error(`Erreur  ${challengesId} :`, error);
            throw error;
        }
    }

    async updateChallenges(challengesId, challengesData) {
        try {
            const challenges = await Challenges.findByPk(challengesData);
            if (!challenges) {
                throw new Error('challengess non trouvé');
            }
            await challenges.update(challengesDataData);
            return challenges;
        } catch (error) {
            console.error(`Erreur  ${challengesId} :`, error);
            throw error;
        }
    }

    async deleteChallenges(challengesId) {
        try {
            const challenges = await Challenges.findByPk(challengesId);
            if (!challenges) {
                throw new Error('challengess non trouvé');
            }
            await challenges.destroy();
            return challenges;
        } catch (error) {
            console.error(`Erreur ${challengesId} :`, error);
            throw error;
        }
    }
}

module.exports = new ChallengesService();