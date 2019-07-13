const _ = require("lodash");
const userModel = require("../models/user");
const eventModel = require("../models/event");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      return userModel.find().exec();
    }
  },

  Mutation: {
    addEvent: (
      parent,
      { event: { object, email, eventActivity, zircoins } }, // TODO: resolve [Object: null prototype] in first position
      context,
      info
    ) => {
      pubsub.publish("EVENT_ADDED", {
        eventAdded: { event: { email, eventActivity, zircoins } }
      });
      const event = new eventModel({ email, eventActivity, zircoins });
      const newEvent = event.save();
      if (!newEvent) {
        throw new Error("Error creating event");
      }
      return newEvent;
    }
  },
  Subscription: {
    eventAdded: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator(["EVENT_ADDED"]),
      resolve: ({
        eventAdded: {
          event: { email, eventActivity, zircoins }
        }
      }) => {
        var query = userModel.where({ email: email });
        query.findOne((err, user) => {
          if (err) return handleError(err);
          if (user == null) return null;
          user.zircoins = user.zircoins + zircoins;
          user.save();
        });
        return { email, eventActivity, zircoins };
      }
    }
  }
};

module.exports = resolvers;
