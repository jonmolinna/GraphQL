const userResolvers = require('./users');
const messageResolvers = require('./messages');

module.exports = {
    // Permite dar formato a la fecha de los messages (name sacas de typeDefs)
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString(),
    },
    Query: {
        ...userResolvers.Query,
        ...messageResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...messageResolvers.Mutation,
    },
};