import mongoose from "mongoose";
import express from "express";
import { graphqlExpress, graphiqlExpress } from "graphql-server-express";
import bodyParser from "body-parser";

import schema from "./src/schema";

const PORT = 1234;
const server = express();

server.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({
    schema
  })
);

server.use(
  "/graphiql",
  graphiqlExpress({
    endpointURL: "/graphql"
  })
);

server.listen(PORT);
console.log("GraphQL API Server up and running at localhost:" + PORT);

mongoose
  .connect("mongodb://localhost/node-graphql", {
    promiseLibrary: require("bluebird"),
    useNewUrlParser: true
  })
  .then(() => console.log("connection successful"))
  .catch(err => console.error(err));
