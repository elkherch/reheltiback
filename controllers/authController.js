const userService = require('../services/userService');
const authService = require('../services/AuthServices');

async function Login(req, res) {
    try {
        const user = await userService.authenticate(req.body.username, req.body.password);

    if (!user) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
    }
    const token = authService.generateToken(user);
    res.json({ token });
    } catch (error) {
        
    }
};

module.exports = {Login};