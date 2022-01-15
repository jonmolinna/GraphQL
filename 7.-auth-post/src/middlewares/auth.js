const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // authorization?. si el authorization existe has split
    
    try {
        const verified = jwt.verify(token, 'ULTRA_SECRET');
        req.verifiedUser = verified.user;
    } catch (err) {
        console.log(err);
    }
    next();
};

module.exports = {
    authenticate,
};