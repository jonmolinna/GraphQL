const { ApolloServer } = require("apollo-server");

const { typeDefs } = require('./schema');
const { Query } = require("./resolvers/Query");
const { Product } = require("./resolvers/Product");
const { Category } = require("./resolvers/Category");
const { db } = require('./db');

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query,
        Product,
        Category,
    },
    context: {
        sayHello: () => console.log('Hello my friends'),
        categories: db.categories,
        products: db.products,
        reviews: db.reviews,
    }
});

server.listen().then(({ url }) => {
    console.log('Server is ready at ' + url);
});