const mongoose = require("mongoose");
//var cors = require("cors");
require("dotenv").config();
const { ApolloServer } = require("apollo-server");

const { resolvers } = require("./graphql/resolvers/resolverIndex");
const { typeDefs } = require("./graphql/typeRef");
const URI_LINK = process.env.MONGODB_CONNECTION_LINK;
const port = process.env.PORT || 3000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context:(req)=> req
});

mongoose
  .connect(URI_LINK)
  .then(() => {
    server.listen({ port }).then((result) => {
      console.log(`connected to ${port}`);
      return result;
    });
  })
  .catch((err) => {
    console.log(err);
  });
