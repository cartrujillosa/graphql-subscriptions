import mongoose from "mongoose";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import userModel from "./models/user";

import typeDefs from "./src/schema";
import resolvers from "./src/resolvers";
import http from "http";
import jwt from "jsonwebtoken";

const PORT = 3031;
const MONGO_URL = "mongodb://localhost/node-graphql";
const app = express();

// TODO: crear servicio aparte que te devuelva el token y ya se comprueba aquí
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";
    const tokenDecoded = jwt.decode(token);
    if (!tokenDecoded) {
      res.json({ message: "Invalid token" });
    }
    const { id, exp } = tokenDecoded;
    if (exp < Math.trunc(Date.now() / 1000)) {
      res.json({ message: "Expired token" });
    }

    // try to retrieve a user with the token
    findUser(id, function(error, userFound) {
      if (error) res.status(422).json({ message: "Some error getting user" });
      if (!userFound) res.json({ message: "User not found" });
    });

    // TODO: manage this warning with res.status
    // (node:23072) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). (rejection id: 1)
    // (node:23072) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
    // add the user to the context
    return { id };
  }
});

server.applyMiddleware({
  app
});

const findUser = function(id, callback) {
  // TODO: user this in other places and understand
  userModel.findOne({ _id: id }, function(err, user) {
    if (err) {
      return callback(err);
    } else if (user) {
      return callback(null, user);
    } else {
      return callback();
    }
  });
};

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(
    `:: Server ready at http://localhost:${PORT}${server.graphqlPath} ::`
  );
  console.log(
    `:: Subscriptions ready at ws://localhost:${PORT}${
      server.subscriptionsPath
    } ::`
  );
});

mongoose
  .connect(MONGO_URL, {
    // TODO check connections succesful and database name
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true
  })
  .then(() => console.log(`:: Connection successful: ${MONGO_URL} ::`))
  .catch(err => console.error(err));
