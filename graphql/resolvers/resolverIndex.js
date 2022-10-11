const { resolverComment } = require("./comment");
const { resolversPost } = require("./post");
const { resolverUser } = require("./user");
exports.resolvers = {
  Query: {
    ...resolversPost.Query,
  },

  Mutation:{
    ...resolverUser.Mutation,
    ...resolversPost.Mutation,
    ...resolverComment.Mutations
  }
};
