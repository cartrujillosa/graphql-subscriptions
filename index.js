import mongoose from "mongoose";
import express from "express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./src/schema";
import resolvers from "./src/resolvers";
import http from "http";

const PORT = 3031;
const MONGO_URL = "mongodb://localhost/node-graphql";
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({
  app
});

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
