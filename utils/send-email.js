const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'elkherchymd22025@gmail.com',
    pass: 'qclmbpkmyxajzsbe',   // Votre mot de passe
  },
});
async function EnvoyerEmail(req, res) {

    try {
    const { email, sujet, message} = req.body;
    const mailOptions = {
      from:'22025@supnum.mr',
      to: email,    
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
    } catch (error) {
        console.error('Erreur lors de l\'importation des données :', error);
    }
}


module.exports = { EnvoyerEmail };
