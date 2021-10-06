/*
// Para tener Autorizacion (HTTP HEADERS)
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImphbmUiLCJpYXQiOjE2MzIxNTUxMTIsImV4cCI6MTYzMjE1ODcxMn0.Yqkss4QZNjUmuGDFX65PBsY08qRCS1OfJJDzzB9FQFo"
}

// Para obtener todos los usuarios
query getUsers{
  getUsers{
    username
    imageUrl
    createdAt
    latestMessage{
      uuid
      from
      to
      content
      createdAt
    }
  }
}

// Para obtener todos los mensajes del usuario con su destinatario
query getMessages{
  getMessages(from: "jane"){
    uuid
    from
    to
    content
    createdAt
  }
}

// Para registrar un message
mutation sendMessage{
  sendMessage(to: "nikone" content: "Hola nikone, como estas"){
    uuid
    from
    to
    content
    createdAt
  }
}


// Para Login
query login{
  login(username: "jane" password: "jane123"){
    username
    token
    createdAt
  }
}

// Para registrar un Usuario
mutation {
    register(username: "brehn" email: "brehn@gmail.com" password: "brehn123" confirmPassword: "brehn123"){
      username
      email
    }
}

// Para consultar usuarios
query {
    getUsers {
      username
      email
    }
}

*/