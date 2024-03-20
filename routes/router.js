const userController = require('../controllers/userController');
const teamsController = require('../controllers/teamController');
const authController = require('../controllers/authController')
const challengeController = require('../controllers/challengesController')
const importExcelController = require('../utils/importExcel')

const juryController = require('../controllers/JuryController')
const router = require('express').Router();
const envoyeEmail = require('../utils/send-email');

const multer = require('multer');
const path = require('path');
filename= '';
const mystorage= multer.diskStorage({
  destination:'./uploads',
  filename:(req , file , cb)=>{
    let date =Date.now();
    let fl = date + '.'+file.mimetype.split('/')[1];
    cb(null,fl);
    filename =fl;
  }
})
const upload = multer({ storage: mystorage });
router.get("/", (req,res,next)=>{
    res.send("Hello Hadrami")
});

router.get("/soumission", (req,res,next)=>{
    res.send("You can submit your work !");
});
router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);
router.get('/teams', teamsController.getAllTeams);
router.post('/teams', teamsController.createTeams);
router.get('/teams/:id', teamsController.getTeamsById);
router.post("/jury/sendNotification", juryController.sendNotificationWithEmail);
router.post("/jury/gradeTeamWork", juryController.gradeTeamWork);
router.put('/teams/:id', teamsController.updateTeams);
router.delete('/teams/:id', teamsController.deleteTeams);
router.get('/challenge', challengeController.getAllChallenges);
router.post('/challenge', challengeController.createChallenges);
router.get('/challenge/:id', challengeController.getChallengesById);
router.put('/challenge/:id', challengeController.updateChallenges);
router.delete('/challenge/:id', challengeController.deleteChallenges);
router.post('/login', authController.Login);
router.post('/import-excel',upload.array('files'), (req, res) => {

    const filePath = path.join(__dirname, '../uploads', filename); 
    console.log("3333333333333333333333333333333333333333",filePath)
    importExcelController.importUsersFromExcel(filePath)
});
router.post('/send-email' , envoyeEmail.EnvoyerEmail);
module.exports = router;
