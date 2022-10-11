const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server");

exports.isAuth =  (req) => {

    if (req.headers.authorization) {
        try {                
            const token = req.headers.authorization.split("Bearer ")[1];

            decodedToken = jwt.verify(token, process.env.jwtSecretKey);
           

          return  decodedToken
        } catch (error) {
         //   console.log(error)
            throw  new AuthenticationError("invalid/expired token ")
        }
    } else {
        throw new AuthenticationError("  header not set ");

        }

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
