const Post = require("../../model/post");
const { isAuth } = require("../../util/isAuth");

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

  Mutation:{
    async createPost(parent , {body},context){


  
  isAuth(context)
    
        
    
    }
  }
};
