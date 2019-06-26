const { makeExecutableSchema } = require("graphql-tools");
const resolvers = require("./resolvers");

// TODO: maybe this file can be improve with schema.graphql file
const typeDefs = `
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
        addUser: User,
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

const schema = makeExecutableSchema({ typeDefs, resolvers });
module.exports = schema;
