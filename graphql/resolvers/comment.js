const { UserInputError } = require("apollo-server");
const Post = require("../../model/post");
const { isAuth } = require("../../util/isAuth");
exports.resolverComment = {
    Mutations: {
      async createComment(parent, { postId, body }, req) {
        let post = null;
        const { userName } = isAuth(req);
        if (body.trim().length > 0) {
          post = await Post.findById(postId);
          if (post) {
            post.comments.unshift({
              body,
              userName,
              createdAt: new Date().toISOString(),
            });
            await post.save();
            console.log(post);
            return post;
          } else throw new UserInputError("post not found");
        } else throw new UserInputError("comment must be not empty ");
      },
    },


  
};

// note mongoes schema should match the keys of typeRef for ex comments in schema should be the them key comments  in typedef

// it is Mutations not mutation