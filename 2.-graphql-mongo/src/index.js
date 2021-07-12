import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import schema from './schema';
import { connect } from './database';

const app = express();
connect();

app.get('/', (req, res) => {
    res.json({
        message: 'Hola Mundo'
    });
});

app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema: schema,
    // Los context siver para pasar cosas entre resolvers
    context: {
        messageId: 'test'
    }
}));

app.listen(3000, () => console.log('Server on port 3000'));


// Para levantar el servidor
// npm start
// rimraf => permite eliminar carpetas