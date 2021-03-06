const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env.json');

module.exports = (context) => {
    if(context.req && context.req.headers.authorization){
        const token = context.req.headers.authorization.split('Bearer ')[1];
        jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
            // Me devuelve el usuario que esta solicitando (username, tiempo de solicitud y experie)
            //user = decodedToken;
            context.user = decodedToken;
            //console.log(user)
        })
    }
    return context;
};