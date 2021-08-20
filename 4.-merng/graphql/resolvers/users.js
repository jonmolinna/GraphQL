const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { validateRegisterInput, validateLoginInput } = require('../../util/validators.js');
const { SECRET_KEY } = require('../../config.js');
const User = require('../../models/User.js');

function generateToken(user){
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username
        }, 
        SECRET_KEY, 
        { expiresIn: '1h'}
    );
};

module.exports = {
    Mutation: {
        async login(_, { username, password }){
            const { errors, valid } = validateLoginInput(username, password);

            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            const user = await User.findOne({ username });

            if(!user){
                errors.general = 'User not found';
                throw new UserInputError('Wrong credentials', { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if(!match){
                errors.general = 'Wrong crendetials';
                throw new UserInputError('Wrong crendetials', { errors });
            }

            const token = generateToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };

        },

        async register(_, {registerInput: {username, email, password, confirmPassword}}){
            // TODO Validate user data
            const { valid, errors } = validateRegisterInput(username, email, password, confirmPassword);
            if(!valid){
                throw new UserInputError('Errors', { errors });
            }

            // TODO Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if(user){
                throw new UserInputError('Username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                })
            }

            // TODO hash password and create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                token
            };

        }
    }
}


/*

mutation {
  register(registerInput:{
    username: "dallas"
    password: "12345"
    confirmPassword: "12345"
    email: "dallas@gmail.com"
  }){
    id
    email
    token
    username
    createdAt
  }
}

--------------------------------------------------
mutation {
  login(username:"kendra", password:"kendra123"){
    id
    email
    token
    username
    createdAt
  }
}

mutation {
  login(username:"eung", password:"eung123"){
    id
    email
    token
    username
    createdAt
  }
}

-------------- Consulta Posts ----------------------
query {
  getPosts {
    id
    body
    createdAt
    username
  }
}

-------------- Consulta Post ---------------------------
{
  getPost(postId: "12333333"){
    id
    body
    createdAt
    username
  }
}


------------ Crear un Post ------------------------------
mutation {
  createPost(body: "This is another post"){
    id
    body
    createdAt
    username
  }
}

{
  "Authorization": "Bearer Token"
}


{
  getPosts{
    id
    body
    createdAt
    username
  }
}

------------------ Delete Post ---------------------------
mutation {
  deletePost(postId: "611e44b918a98f1610a099d8")
}


---------------- Post Comment ----------------------------
query posts{
  getPosts {
    id
    body
    createdAt
    username
    comments {
      id
      username
      body
    }
  }
}

query posts{
  getPosts {
    id
    body
    createdAt
    username
  }
}

mutation comment {
  createComment(postId: "611e44d018a98f1610a099da", body: "new comment on only post"){
    id
    body
    comments {
      id
      createdAt
      username
      body
    }
  }
}



*/