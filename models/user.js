const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  zircoins: Number,
  social: {
    googleProvider: {
      id: String,
      token: String
    }
  }
});

module.exports = mongoose.model("User", userSchema);
