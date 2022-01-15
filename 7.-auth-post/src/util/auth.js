const jwt = require('jsonwebtoken');

const createJWTToken = user => {
    return jwt.sign({ user }, 'ULTRA_SECRET', {
        expiresIn: '1h',
    });
};

module.exports = {
    createJWTToken,
};