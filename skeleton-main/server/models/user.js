const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  wins: Number,
  username: String,
  lobby: String,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
