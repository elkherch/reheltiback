const ChallengeServices = require('../services/challengesService');
const fs = require('fs');
const unzipper = require('unzipper');

async function getAllChallenges(req, res) {
  try {
    const challenges = await ChallengeServices.getAllChallenges();
    res.json(challenges);
  } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}

async function createChallenges(req, res) {
  try {
    const challengeData = req.body;
    const challenge = await ChallengeServices.createChallenges(challengeData);
    res.status(201).json(challenge);
  } catch (error) {
    console.error('Erreur lors de la création de utilisateur :', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function getChallengesById(req, res) {
  const challengesId = req.params.id;
  try {
    const challenge = await ChallengeServices.getChallengesById(challengesId);
    res.json(challenge);
  } catch (error) {
    console.error(`Erreur ${challengesId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function updateChallenges(req, res) {
  const challengesId = req.params.id;
  const challengeData = req.body;
  try {
    const challenge = await ChallengeServices.updateChallenges(challengesId, challengeData);
    res.json(challenge);
  } catch (error) {
    console.error(`Erreur ${challengesId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
}
async function deleteChallenges(req, res) {
  const challengesId = req.params.id;
  try {
    const challenge = await ChallengeServices.deleteChallenges(challengesId);
    res.json(challenge);
  } catch (error) {
    console.error(`Erreur lors de la suppression ${challengesId} :`, error);
    res.status(500).json({ error: 'Erreur interne du serveur'});
  }
}
async function importChallengesFromZip(req, res) {
  try {
    if (!req.files || !req.files.zipFile) {
      return res.status(400).json({ error: 'No zip file uploaded' });
    }

    const zipFile = req.files.zipFile;
    const zipFilePath = `./uploads/${zipFile.name}`;

    await zipFile.mv(zipFilePath);

    const descriptions = await extractDescriptionsFromZip(zipFilePath);

    await ChallengesService.importChallengesFromDescriptions(descriptions);

    fs.unlinkSync(zipFilePath);

    return res.status(200).json({ message: 'Challenges imported successfully' });
  } catch (error) {
    console.error('Error importing challenges:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function extractDescriptionsFromZip(zipFilePath) {
  const descriptions = [];

  await fs.createReadStream(zipFilePath)
    .pipe(unzipper.Parse())
    .on('entry', async entry => {
      const fileName = entry.path;
      if (fileName.endsWith('.txt')) {
        const description = await entry.buffer();
        descriptions.push(description.toString());
      } else {
        entry.autodrain();
      }
    });

  return descriptions;
}
module.exports = {
  getAllChallenges,
  getChallengesById,
  createChallenges,
  updateChallenges,
  deleteChallenges,
  importChallengesFromZip     
};
