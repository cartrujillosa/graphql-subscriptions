const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  // id ???
  email: String,
  eventActivity: String,
  zircons: Number
});

module.exports = mongoose.model("Event", EventSchema);
