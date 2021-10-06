const { UserInputError, AuthenticationError } = require('apollo-server');
const { Op } = require('sequelize');
console.log([Op.in])
const { Message, User } = require('../../models');

module.exports = {
    Query: {
        getMessages: async (parent, { from }, { user }) => {
            try {
                if(!user) throw new AuthenticationError('Unauthenticated');

                const otherUser = await User.findOne({
                    where: { username: from }
                });
                if(!otherUser) throw new UserInputError('User not found');

                const usernames = [user.username, otherUser.username]
                const messages = await Message.findAll({
                    where: {
                        // Op.in es una condicion para hacer una consulta con varias condiciones
                        // select * from producto where (nameProduct IN ('automovil', 'moto'))
                        from: { [Op.in]: usernames}, 
                        to: { [Op.in]: usernames}
                    },
                    order: [['createdAt', 'DESC']]
                });

                return messages;
            } catch (err) {
                console.log(err);
                throw err;
            }
        }
    },
    Mutation: {
        sendMessage: async (parent, { to, content }, { user }) => {
            //console.log('Usuario >>>>>>', user) // { username: 'jane', iat: 1632752380, exp: 1632755980 }
            try {
                if(!user) throw new AuthenticationError('Unauthenticated')
                const recipient = await User.findOne({ where: { username : to }})
                if(!recipient){
                    throw new UserInputError('User not found');
                }
                else if(recipient.username === user.username){
                    throw new UserInputError('You cant message yourself');
                }

                if(content.trim() === ''){
                    throw new UserInputError('Message is empty');
                }
                const message = await Message.create({
                    from: user.username,
                    to,
                    content
                });
                return message;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
    }

};

/*
parent =>
args => Es para pasar los parametros
context => Sirve para pasar variables entre resolvers. ejm token
info => 
*/

/**
 * Operadores
 * https://sequelize.org/master/manual/model-querying-basics.html#shorthand-syntax-for--code-op-in--code-
 * 
 */