const { ApolloServer } = require("apollo-server-express");
const { typeDefs } = require('./typeDefs');
const { resolvers } = require('./resolvers');

const express = require('express');
const app = express();

const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

async function startApolloServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });

    await new Promise(resolve => app.listen({ port: 4000 }, resolve));
    console.log('Server Runnng on PORT 3000');
    return { server, app };
}

startApolloServer();

//url => Server ready at http://localhost:4000/graphql