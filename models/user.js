const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  zircoins: Number
});

module.exports = mongoose.model("User", userSchema);
