import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    body: String!
    username: String!
    createdAt: String!
    updatedAt: String
    comments: [Comment]!
    likes: [Like]!
  }

  type User {
    id: ID!
    email: String!
    username: String!
    first_name: String!
    last_name: String!
    password: String!
    date_of_birth: String!
    admin: Boolean!
    createdAt: String!
    # token: String!
  }

  type Comment {
    id: ID!
    username: String!
    body: String!
    createdAt: String!
  }

  type Like {
    id: ID!
    username: String!
    createdAt: String!
  }

  input RegisterUserInput {
    email: String!
    username: String!
    password: String!
    confirmPassword: String!
    first_name: String!
    last_name: String!
    date_of_birth: String!
    admin: Boolean!
  }

  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
    admin: [User]
    user(id: ID!): User
    getAllUsers: [User!]
  }

  type Mutation {
    registerUser(registerUserInput: RegisterUserInput): User!
    assignAdmin(userId: Int): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
    createComment(postId: ID!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
`;

export default typeDefs;
