const { UserInputError } = require("apollo-server");
const Post = require("../../model/post");
const { isAuth } = require("../../util/isAuth");
exports.resolverComment = {
  Mutations: {
    async createComment(parent, { postId, body }, req) {
      let post = null;
      const user = isAuth(req);
      if (body.trim().length > 0) {
        post = await Post.findById(postId);
        if (post) {
          post.comments.unshift({
            body,
            userName: user.userName,
            userId: user.id,
            createdAt: new Date().toISOString(),
          });
          await post.save();
          console.log(post);
          return post;
        } else throw new UserInputError("post not found");
      } else throw new UserInputError("comment must be not empty ");
    },

    async deleteComment(parent, { commentId, postId }, req) {
      const loggedUser = isAuth(req);
      const post = await Post.findById(postId);
      if (post) {
        const commentIndex = post.comments.findIndex(
          (comment) => comment._id.toString() === commentId
        );
        if (post.comments[commentIndex].userId.toString() === loggedUser.id) {
          post.comments.splice(commentIndex, 1);

          await post.save();
          return post
        }
        else throw new UserInputError("not authorized to delete comment");
      }
      else throw new UserInputError("post not found");
    },
  },
};

// note mongoes schema should match the keys of typeRef for ex comments in schema should be the them key comments  in typedef

// it is Mutations not mutation
