const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
  lobbyName: String,
  userNames: [String],
});

// compile model from schema
module.exports = mongoose.model("lobby", LobbySchema);
