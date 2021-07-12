// que debe de hacer cuando llega esa consulta (Controlador del Servidor)

import { tasks } from './sample';
import User from './models/User';

export const resolvers = {
    Query: {
        hello: () => {
            return 'Hello World with Graphql'
        },
        numero(){
            return 2
        },
        greet(root, args, ctx){
            console.log(ctx)
            console.log(args)
            return `Hello ${args.name}`;
        },
        tasks(){
            return tasks;
        },
        async Users(){
          return await User.find();
        }
    },
    Mutation: {
        createTask(_, { input }){
            //console.log(input)
            input._id = tasks.length;
            tasks.push(input);
            return input
        },
        async createUser(_, args){
          const newUser = new User(args.input)
          //console.log(newUser);
          await newUser.save();
          return newUser
        },
        async deleteUser(_, { _id }){
          return await User.findByIdAndDelete(_id)
        },
        async updateUser(_, { _id, input }){
          return await User.findByIdAndUpdate(_id, input, { new: true }); // new : true => permite ver el dato modificado
        }
    }
};

/*
Para hacer consultas
------------------------------
{
  tasks {
    title
    description
  }
}

query {
  tasks {
    _id
    title
    description
    number
  }
}

Para hacer modificaciones
----------------------------
mutation {
  createTask(input: {
    title: "title one"
    description: "Description one"
  }) {
    _id
    title
    description
    number
  }
}

Para eliminar
-------------------------------
mutation {
  deleteUser(_id: "60e2f3e7d2b86a22d0f7db55"){
    _id
    firstname
  }
}

Para Actualizar
--------------------------------
mutation {
  updateUser(
    _id: "60e2f423d2b86a22d0f7db57",
    input: {
      firstname: "Dallas"
      lastname: "Zevallos"
    }
  ) {
    _id
    firstname
    lastname
    age
  }
}


*/