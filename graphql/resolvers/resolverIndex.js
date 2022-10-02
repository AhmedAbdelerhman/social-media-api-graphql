const { resolversPost } = require("./post");
const { resolverUser } = require("./user");
exports.resolvers = {
  Query: {
    ...resolversPost.Query,
  },

  Mutation:{
    ...resolverUser.Mutation
  }
};
