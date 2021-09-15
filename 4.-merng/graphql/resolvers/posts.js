const { AuthenticationError, UserInputError } = require('apollo-server');

const Post = require('../../models/Post.js');
const checkAuth = require('../../util/check-auth.js');

module.exports = {
    Query: {
        async getPosts(){
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch(err){
                throw new Error(err);
            }
        },
        async getPost(_, { postId }){
            try {
                const post = await Post.findById(postId);
                if(post){
                    return post;
                } else {
                    throw new Error('Post not found');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },

    Mutation: {
        async createPost(_, { body }, context){
            const user = checkAuth(context);
            //console.log(user);

            if (body.trim() === ''){
              throw new Error('Post body must not be empty');
            };

            const newPost = new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString(),
            });

            const post = await newPost.save();

            context.pubsub.publish('NEW_POST', {
                newPost: post
            })

            return post;
        },
        async deletePost(_, { postId }, context){
            const user = checkAuth(context);

            try{
                const post = await Post.findById(postId);
                if(user.username === post.username){
                    await post.delete();
                    return 'Post deleted successfully'
                } else {
                    throw new AuthenticationError('Action not allowed');
                }
            } catch(err){
                throw new Error(err);
            }
        },
        async likePost(_, { postId }, context){
            const { username } = checkAuth(context);

            const post = await Post.findById(postId);
            if(post){
                if(post.likes.find(like => like.username === username)){
                    // Post already likes, unlike it
                    post.likes = post.likes.filter(like => like.username !== username);
                } else {
                    // Not liked, like post
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }

                await post.save();
                return post;
            } else throw new UserInputError('Post not found');
        }
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator('NEW_POST')
        }
    }
};


/*
----------- Todas las Consultas ----------------------------------
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

mutation {
  login(username:"eung", password:"eung123"){
    id
    email
    token
    username
    createdAt
  }
}

mutation {
  createPost(body: "Mi tercer comentario gooo"){
    id
    body
    createdAt
    username
  }
}

query posts{
  getPosts {
    id
    body
    createdAt
    username
    commentCount
    comments {
      id
      username
      body
    }
    likeCount
    likes {
      id
      username
    }
  }
}

mutation {
  deletePost(postId: "6124db3e22acbd031851a89d")
}

mutation comment {
  createComment(postId: "6124db1d22acbd031851a89a", body: "Tercer Comentario >>>>>"){
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

mutation{
  deleteComment(postId: "6124db1d22acbd031851a89a" commentId: "6124df4022acbd031851a8b2"){
    id
    comments {
      id
      username
      body
    }
  }
}

mutation{
  likePost(postId: "6124db1d22acbd031851a89a"){
    id
    body
    username
    likes {
      id
      username
    }
  }
}

subscription{
  newPost {
    id
    body
    createdAt
    username
    comments {
      createdAt
    }
    likes {
      createdAt
    }
  }
}


*/