const Post = require("../../model/post");
const { isAuth } = require("../../util/isAuth");

exports.resolversPost = {
  Query: {
    async getPosts() {
      try {
        const posts = await Post.find().sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        console.log(err);
      }
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId);
        if (post) {
          return post;
        } else {
          throw new Error(" Post not found ");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    async createPost(parent, { body }, req) {
      const user = isAuth(req);
      const newPost = new Post({
        body: body,
        user: user.id,
        userName: user.userName,
        createdAt: new Date().toISOString(),
      });
      const post = await newPost.save();
      console.log(post);
      return post;
    },

    async deletePost(parent, { postId }, req) {
      const user = isAuth(req);
      let deletedPost = null;
      const post = await Post.findById(postId);
      if (post) {
        console.log(post.user.toString());
        console.log(user.id);
        if (post.user.toString() === user.id) {
          console.log("post", post);
          deletedPost = await post.delete();
        }
      }

      return deletedPost;
    },
  },
};
