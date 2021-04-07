const { gql } = require("apollo-server");

/****** = gql`
* type Post is for adding posts
* type User is for adding users
* input type is used for giving inputs to resolvers 
* -- it will return something for us
* type Query is for getting posts
* type Mutation is for making a change in the db.
*  -- input from users can be used as arguments.
*  -- ours here returns a User
`
*/
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getPosts: [Post]
    getPost(postId: ID!): Post
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postId: ID!): String!
  }
`;
