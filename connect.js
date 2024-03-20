const express = require('express');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();
const port = 3001;

//body-parser pour analyser le corps des requêtes POST
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'elkherchymd22025@gmail.com',
    pass: 'qclmbpkmyxajzsbe',   // Votre mot de passe
  },
});

app.use(cors()); // Permet les requêtes CORS

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'convoiturage',
});

con.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données !');
    return;
  }
  console.log('Connexion à la base de données réussie');
});

app.get('/tragets', (req, res) => {
    const { villeDepart, villeArrivee } = req.query;
    const query = `SELECT * FROM tragets WHERE ville_depart = '${villeDepart}' AND ville_Arrive = '${villeArrivee}'`;
    con.query(query, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération', error);
        res.status(500).json({ error: "Une erreur s'est produite" });
        return;
      }
  
      res.json(results);
    });
  });
  
  app.get('/temoignages', (req, res) => {
    const query = `SELECT * FROM temoignagesclients`;
    con.query(query, (error, results) => {
      if (error) {
        console.error('Erreur lors de la récupération', error);
        res.status(500).json({ error: "Une erreur s'est produite" });
        return;
      }
  
      res.json(results);
    });
  });
  
  app.post('/send-email', (req, res) => {
    const { email, sujet, message} = req.body;
    const mailOptions = {
      from:email,
      to: '22025@supnum.mr',    
      subject: sujet,
      text: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'e-mail' });
      } else {
        console.log('E-mail envoyé :', info.response);
        res.json({ success: 'E-mail envoyé avec succès' });
      }
    });
  }); 
  
  app.get('/notification', (req, res) => {
    const { emailpass } = req.query;
    const query = `SELECT * FROM user_passager WHERE passager_email = '${emailpass}' `;
    con.query(query, (error, results) => {
      if (error) {
        console.error('Erreur lors de la recherche de l\'e-mail :', error);
        res.status(500).json({ error: 'Erreur lors de la recherche de l\'e-mail' });
      } else {
        if (results.length > 0) {
          res.json({ success: 'L\'e-mail existe dans la base de données' });
        } else {
          res.status(404).json({ error: 'Adresse e-mail non trouvée' });
        }
      }
    });
  });
  
app.listen(port, () => {
  console.log('Serveur en cours d\'exécution sur le port', port);
});
