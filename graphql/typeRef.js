const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    getPosts: [Post]
    getPost(postId: ID): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User
    login(email: String, password: String): User
    createPost(body: String!): Post!
    deletePost(postId: ID!): Post!
    createComment(body: String!, postId: ID!): Post!
    deleteComment(commentId: ID!, postId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Post {
    id: ID!
    body: String!
    userName: String!
    createdAt: String!
    comments: [Comment]!
    like: [Like]!
  }
  type Comment {
    id: ID
    createdAt: String
    userName: String
    body: String
  }
  type Like {
    id: ID!
    createdAt: String!
    userName: String!
  }

  input RegisterInput {
    email: String!
    password: String!
    userName: String!
  }

  type User {
    id: ID
    email: String
    token: String
    userNAme: String
    createdAt: String
    message: String
  }
`;
