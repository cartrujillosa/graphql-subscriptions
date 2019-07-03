const _ = require("lodash");
const UserModel = require("../models/User");
const EventModel = require("../models/Event");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

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
      pubsub.publish("EVENT_ADDED", {
        eventAdded: { event: { email, eventActivity, zircoins } }
      });
      const eventModel = new EventModel({ email, eventActivity, zircoins });
      const newEvent = eventModel.save();
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
        var query = UserModel.where({ email: email });
        query.findOne((err, user) => {
          if (err) return handleError(err);
          if (user == null) return null;
          user.zircoins = user.zircoins + zircoins;
          user.save();
        });
        return event;
      }
    }
  }
};

module.exports = resolvers;
