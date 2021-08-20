module.exports = {
    MONGODB: 'mongodb://localhost/merng',
    SECRET_KEY: 'some very secret key'
};








// mongodb+srv://admin:TWvnoiZQ9ESuA7Cj@cluster0.dohwb.mongodb.net/merngDB?retryWrites=true&w=majority
// MONGODB: "mongodb+srv://admin:TWvnoiZQ9ESuA7Cj@cluster0.dohwb.mongodb.net/merng-2?retryWrites=true&w=majority",
// 'mongodb://localhost/merng'

/*
async function connect(){
    try {
        await mongoose.connect(MONGODB, {
            useNewUrlParser: true
        });
        console.log('>>> Database Connected');
    } catch {
        console.log('Error en la conexion de BD');
    }
};

connect();

----------------------------------------------------

mongoose
    .connect(MONGODB, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MongoDB Connected');
        return server.listen({ port: 5000 });
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    })
    .catch(error => console.log(`Error en la Conexion ${error}`));

*/