const jwt = require('jsonwebtoken');
// const { sequelize, jwtSecret } = require('./config/connect');


class authService {
    generateToken(user) {
        return jwt.sign({ userId: user.id }, 'jwtSecret', { expiresIn: '1h' });
    }

    verifyToken(token) {
        try {
            const decodedToken = jwt.verify(token, 'jwtSecret');
            return decodedToken.userId;
        } catch (error) {
            return null;
        }
    }
}

module.exports = new authService();
