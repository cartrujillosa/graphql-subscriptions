const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");
const { gql } = require("apollo-server");

// TODO: maybe this file can be improve with schema.graphql file
const typeDefs = gql`
  type User {
    _id: ID!
    email: String
    zircoins: Int
  }

  type Event {
    _id: ID!
    eventActivity: String
    zircoins: String
  }

  type Query {
    users: [User]
    events: [Event]
  }

  type Mutation {
    addUser: User
    addEvent(event: EventInput): Event
  }

  input EventInput {
    email: String
    eventActivity: String
    zircoins: Int
  }

  type Subscription {
    eventAdded: Event
  }
`;

module.exports = typeDefs;
// const schema = makeExecutableSchema({ typeDefs, resolvers });
// module.exports = schema;
