//PubSub is for type Subscription. We pass it to context down below in const server
const { ApolloServer, PubSub } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(MONGODB, options)
  .then(() => {
    console.log("MongoDB Connected");
    return server.listen({ port: 5000 });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  });

// server.listen({ port: 5000 }).then((res) => {
//   console.log(`Server running at ${res.url}`);
// });
