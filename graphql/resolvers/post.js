
const Post = require("../../model/post");
exports.resolversPost = {
    Query: {
      async getPosts() {
        try {
          const posts = await Post.find({});
          return posts;
        } catch (err) {
          console.log(err);
        }
      },
    },
  };