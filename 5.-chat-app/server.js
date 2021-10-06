const { ApolloServer } = require('apollo-server');

const { sequelize } = require('./models');

const resolvers = require('./graphql/resolvers');
const typeDefs = require('./graphql/typeDefs.js');
const contextMiddleware = require('./util/contextMiddleware.js')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);

  sequelize
    .authenticate()
    .then(() => console.log('Database connected!!'))
    .catch(err => console.log(err))

});


// Los Context sirven para pasar entre resolcers como token.