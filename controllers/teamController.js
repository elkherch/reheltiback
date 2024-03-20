const teamService = require('../services/teamService');

async function getAllTeams(req, res) {
  try {
    const teams = await teamService.getAllteams();
    res.json(teams);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function createTeams(req, res) {
  try {
    const teamsData = req.body;
    const team = await teamService.createTeams(teamsData);
    res.status(201).json(team);
  } catch (error) {
    console.error('Erreur lors de la création de utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function getTeamsById(req, res) {
  const teamId = req.params.id;
  try {
    const team = await teamService.getTeamsById(teamId);
    res.json(team);
  } catch (error) {
    console.error(`Erreur ${teamId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function updateTeams(req, res) {
  const teamId = req.params.id;
  const teamsData = req.body;
  try {
    const team = await teamService.updateTeams(teamId, teamsData);
    res.json(team);
  } catch (error) {
    console.error(`Erreur ${teamId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function deleteTeams(req, res) {
  const teamId = req.params.id;
  try {
    const team = await teamService.deleteTeams(teamId);
    res.json(team);
  } catch (error) {
    console.error(`Erreur lors de la suppression ${teamId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
module.exports = {
  getAllTeams,
  createTeams,
  getTeamsById,
  updateTeams,
  deleteTeams
};
