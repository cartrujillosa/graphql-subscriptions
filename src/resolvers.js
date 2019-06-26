const _ = require("lodash");
const UserModel = require("../models/User");
const EventModel = require("../models/Event");
// const { PubSub } = require("apollo-server");

// const pubsub = new PubSub();

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      return UserModel.find().exec();
    }
  },
  Mutation: {
    addEvent: (
      parent,
      { event: { email, eventActivity, zircoins } }, // TODO: resolve [Object: null prototype] in first position
      context,
      info
    ) => {
      pubsub.publish(EVENT_ADDED, { eventAdded: args });
      const eventModel = new EventModel({ email, eventActivity, zircoins });
      const newEvent = eventModel.save();
      if (!newEvent) {
        throw new Error("Error creating event");
      }
      return newEvent;
    }
    // Subscription: {
    //   eventAdded: {
    //     // Additional event labels can be passed to asyncIterator creation
    //     subscribe: () => pubsub.asyncIterator([EVENT_ADDED])
    //   }
    // }
  }
};

module.exports = resolvers;
