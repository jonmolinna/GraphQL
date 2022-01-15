/*
------------------------------ Delete Comment
mutation {
  deleteComment(id: "61e2f6dcc03bbe8f65112572")
}

------------------------------ Update Comment
mutation{
  updateComment(
    id: "61e2f6dcc03bbe8f65112572",
    comment: "Second Comment",
  ) {
    id
    comment
    post {
      id
      title
    }
  }
}

------------------------------ Get Comment
{
  comment(id: "61e2f6dcc03bbe8f65112572") {
    id
    comment
    user {
      id
      username
      displayName
      email
    }
    post {
      id
      title
      body
    }
  }
}

------------------------------ Get Comments
{
  comments {
    id
    comment
    user {
      username
      displayName

    }
  }
}


------------------------------ Create Comment
mutation {
  addComment(
    postId: "61e2dd4c6fde1bbb055c91f6",
    comment: "First Comment",
  ) {
    id
    comment
  }
}

------------------------------ Delete Post
mutation {
  deletePost(postId: "61e2dd6a6fde1bbb055c91f9")
}

------------------------------ Update Post
mutation {
  updatePost(
    id: "61e2dd4c6fde1bbb055c91f6",
    title: "updated",
    body: "updated description"
  ) {
    id
    title
    body
  }
}

------------------------------ Get Post
query {
  post(id: "61e2dd4c6fde1bbb055c91f6") {
    id
    title
    body
    author {
      id
      username
      displayName
      email
    }
  }
}

query {
  post(id: "61e2dd4c6fde1bbb055c91f6") {
    id
    title
    body
    author {
      id
      username
      displayName
      email
    }
    comments {
      id
      comment
      user {
        username
      }
    }
  }
}

------------------------------ Get Posts
query {
  posts {
    id
    title
    body
    author {
      id
      username
    }
  }
}

------------------------------ Create Post
mutation {
  createPost(
    title: "title 1",
    body: "description 1",
  ) {
    id
    title
    body
    author {
      id
      username
      displayName
      email
    }
  }
}

------------------------------ User
query {
  user(id: "61e19215de95c4516204e04e") {
    id
    username
    email
    displayName
    createdAt
    updatedAt
  }
}

------------------------------ Users
query {
  users {
    id
    username
    email
    displayName
    createdAt
    updatedAt
  }
}

------------------------------ Login
mutation {
  login(
    email: "contreras123@gmail.com",
    password: "123456789"
  )
}

------------------------------ Register
mutation {
    register(
      username: "Kendra Contreras",
      email: "contreras123@gmail.com",
      password: "123456789",
      displayName: "kendra"
    )
}

*/