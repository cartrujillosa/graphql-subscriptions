const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  // id ???
  email: String,
  zircoins: Number
});

module.exports = mongoose.model("User", UserSchema);
