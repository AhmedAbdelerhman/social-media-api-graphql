const { resolverComment } = require("./comment");
const { resolversPost } = require("./post");
const { resolverUser } = require("./user");
exports.resolvers = {
  // every time we return post it will go throw object here anf we can modify the return object
  Post:{
    commentCount:(parent)=> parent.comments.length,
    likeCount:(parent)=>parent.likes.length
   },
  Query: {
    ...resolversPost.Query,
  },

  Mutation:{
    ...resolverUser.Mutation,
    ...resolversPost.Mutation,
    ...resolverComment.Mutations
  }
};