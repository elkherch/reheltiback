const Evaluations = require('../model/EvaluationsModel');

async function gradeTeamWork(teamId, defiId, juryMemberId, score, feedback) {
    try {
        const evaluation = await Evaluations.create({
            challenge_id: defiId,
            team_id: teamId,
            jury_member_id: juryMemberId,
            score: score,
            feedback: feedback,
        });
        return evaluation;
    } catch (error) {
        console.error('Error grading team work:', error);
        throw error;
    }
}

module.exports = {
    gradeTeamWork,
};
