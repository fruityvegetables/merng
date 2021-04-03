const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const { MONGODB } = require("./config.js");

const server = new ApolloServer({
  typeDefs,
  resolvers,
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
