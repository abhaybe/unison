const mongoose = require("mongoose");

const LobbySchema = new mongoose.Schema({
  lobbyName: String,
  userIds: [String],
  isPlaying: Boolean,
});

// compile model from schema
module.exports = mongoose.model("lobby", LobbySchema);
