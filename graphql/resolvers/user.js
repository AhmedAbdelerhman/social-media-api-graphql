const User = require("../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");
exports.resolverUser = {
  Mutation: {
    async login(_, { email, password }) {
      let user = await User.findOne({ email: email });
      console.log(user)
      if (!user) {
        throw new UserInputError(`user not found`);
      }

      const match = bcrypt.compare(password,user.password)
      if(!match){

        throw new UserInputError(`wrong password `);
        return
      }
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          userName: user.userName,
        },
        process.env.jwtSecretKey
      );
      return {
        id: user._id,
        email:user.email,
        token,
      };

    },
    async register(
      parent,
      { registerInput: { email, password, userName } },
      context
    ) {
      // TODO validate user data
      //  User.find({email:email}).then(user => {
      //  console.log(user);
      //  return user;
      //   })
      //   .catch(err => {
      //  console.log(err);
      //   });
      try {
        
        const hashedPassword = await bcrypt.hash(password, 12);
        let newUser = new User({
          email,
          password: hashedPassword,
          userName,
          createdAt: new Date().toISOString(),
        });
        const res = await newUser.save();
        const token = jwt.sign(
          {
            id: res._id,
            email: res.email,
            userName: res.userName,
          },
          process.env.jwtSecretKey
        );
        return {
          id: res._id,
          ...res,
          token,
        };
      } catch (error) {
        console.log(error);
        if (error.code === 11000)
          throw new UserInputError(`${error.keyValue.email} is already taken`, {
            errors: {
              email: "this email taken",
            },
          });
        return { message: "email already there " };
      }
    },
  },
};
