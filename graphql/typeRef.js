const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    getPosts: [Post]
  }

  type Mutation {
    register(registerInput: RegisterInput): User
  }
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    userName: String!
  }

  type User {
    id: ID!
    email: String!
    token: String!
    userNAme: String!
    createdAt: String!
  }
`;