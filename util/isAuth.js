const jwt = require("jsonwebtoken");
const User = require("../model/user");
const { AuthenticationError } = require("apollo-server");

exports.isAuth = async (context) => {
    if (context.req.headers.authorization) {
        console.log("header");
        try {
            const token = context.req.headers.authorization.split(" ")[1];

            decodedToken = jwt.verify(token, process.env.jwtSecretKey);
            user = await User.findById(decodedToken.userId);

        } catch (error) {
            throw  new AuthenticationError("invalid/expired token ")
        }
    } else {
        }

    throw new Error(" Authentication header must be provided ");
};
// exports.isAuth = (context) => {
//   const authHeader = context.req.headers.authorization;
//   if (authHeader) {
//     // Bearer
//     const token = authHeader.split(" Bearer ")[1];
//     if (token) {
//       try {
//         const user = jwt.verify(token, SECRET_KEY);
//         return user;
//       } catch (err) {
//         throw new AuthenticationError(" Invalid / Expired token ");
//       }
//     }
//     throw new Error(" Authentication token must be ' Bearer [ token ] ");
//   }
//   throw new Error(" Authentication header must be provided ");
// };
