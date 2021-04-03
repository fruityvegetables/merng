const postsResolvers = require("./posts");
const usersResolvers = require("./users");

//mutations will go here vv
module.exports = {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
  },
};
