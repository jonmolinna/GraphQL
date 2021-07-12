const express = require('express');
const app = express();

const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const { courses } = require('./data.json');

const schema = buildSchema(
    `
        type Query {
            course(id: Int!): Course
            courses(topic: String): [Course]
        }

        type Mutation {
            updateCourseTopic(id: Int!, topic: String!) : Course
        }

        type Course {
            id: Int
            title: String
            description: String
            author: String
            topic: String
            url: String
        }
    `
);

let getCourse = (args) => {
    let id = args.id;
    return courses.filter(course => {
        return course.id == id
    })[0]
}

let getCourses = (args) => {
    if(args.topic){
        let topic = args.topic;
        return courses.filter(course => course.topic === topic)
    } else {
        return courses;
    }
}

let updateCourseTopic = ({id, topic}) => {
    courses.map(course => {
        if (course.id === id){
            course.topic = topic
            return course
        }
    })
    return courses.filter(course => course.id === id)[0]
}

const root = {
    course : getCourse,
    courses : getCourses,
    updateCourseTopic : updateCourseTopic
}

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(3000, () => console.log('Server on port 3000'));




/*
Consulta en el Web

query getCoursesWithFragments($courseID1: Int!, $courseID2: Int!) {
  course1: course(id: $courseID1) {
    ...courseFields
  }
  
  course2: course(id: $courseID2) {
    ...courseFields
  }
}

fragment courseFields on Course {
  title
  author
  description
  topic
  url
}

{
  "courseID1" : 1,
  "courseID2": 2
}


mutation updateCourseTopic($id: Int!, $topic: String!) {
  updateCourseTopic(id: $id, topic: $topic) {
    ...courseFields
  }
}



url => http://localhost:3000/graphq

*/