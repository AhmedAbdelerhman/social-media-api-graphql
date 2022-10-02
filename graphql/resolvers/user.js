const User = require("../../model/user");

exports.resolverUser = {
  Mutation: {
    async register(parent, { email, password, userName }, context) {
        // TODO validate user data
         User.find({email:email}).then(user => {
         console.log(user);
         return user;
          })
          .catch(err => {
         console.log(err);
          });
    },
  },
};
