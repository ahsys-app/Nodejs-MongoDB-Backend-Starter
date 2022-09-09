const jwt = require('jsonwebtoken');

const expiresIn = process.env.JWT_EXPIRE_IN || '12h'

const generateToken = (userId, userEmail) => {
    return jwt.sign({ id: userId, email: userEmail }, process.env.JWT_SECRET, { expiresIn: expiresIn });
}

module.exports = generateToken;
