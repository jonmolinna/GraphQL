const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const schema = require('./graphql/schema');
const { connectDB } = require('./db');
const { authenticate } = require('./middlewares/auth');

connectDB();
const app = express();

// Rutas
app.use(authenticate);

app.get('/', (req, res) => {
    res.send('Welcome  to my graphql api');
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true // interfaz para query y mutaciones
}));

app.listen(3000);
console.log('Server on port 3000');