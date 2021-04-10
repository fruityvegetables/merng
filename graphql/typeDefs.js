const { gql } = require("apollo-server");

/****** = gql`
* type Post is for adding posts
* you can add a ! inside the comments array [Comment!] 
* -- that is for a different use case
* -- we are finding the numbers of likes and comments on the server
* type User is for adding users
* input type is used for giving inputs to resolvers 
* -- it will return something for us
* type Query is for getting posts
* type Mutation is for making a change in the db.
* -- input from users can be used as arguments.
* -- ours here returns a User
* -- deleteComment takes a postId to provide the ability to check if the post is still up or not.
* -- likePost will work as a toggle
* type Subscription takes a lot of bandwidth. It is useful for polls/chat apps. here we will not use it
`
*/
module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
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
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: String!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
  }
  type Subscription {
    newPost: Post!
  }
`;
