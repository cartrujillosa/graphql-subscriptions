const mongoose = require("mongoose");

const eventSchema2 = new mongoose.Schema({
  eventActivity: String,
  zircoins: Number
});

module.exports = mongoose.model("Event", eventSchema2);
