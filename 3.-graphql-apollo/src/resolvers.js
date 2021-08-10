const { users } = require('./fakeData.js');

const resolvers = {
    Query: {
        getAllUsers(){
            return users
        },
    },

    Mutation: {
        createUser(parent, args){
            const newUser = args;
            users.push(newUser);
            return newUser;
        }
    },

};

module.exports = { resolvers };

/*
query {
  getAllUsers {
    name
    age
    married
  }
}

mutation {
  createUser(name: "Jon", age: 24, married: true){
    name
    age
    married
  }
}
*/