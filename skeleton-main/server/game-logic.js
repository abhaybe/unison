const User = require("./models/user");
const Lobby = require("./models/lobby");

async function getUserIdsOfGame (userId) {
  let user = await User.findOne({ _id: userId })
  let lobby = await Lobby.findOne({lobbyName: user.lobby })
  return lobby.userIds;
}

async function someoneWon (userId) { // adds that a person won
  User.findOne({ _id: userId }).then((user) => {
    Lobby.updateOne({ lobbyName: user.lobby },
      { $push: { peopleWhoWon : userId } }
    )
  });
};

async function gameOver(userId) {
  return await User.findOne({ _id: userId }).then((user) => {
    Lobby.findOne({lobbyName: user.lobby }).then((lobby) => {
      lobby.peopleWhoWon.length == lobby.userIds.length
    })
  });
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

// keyMaps: {[userid, letter]:[userid, movement]}
let movements = ["up", "down", "left", "right"];
async function assignKeyMaps (userIds) {
  console.log("here")
  var user = await User.findOne({ _id: userIds[0] })
  console.log("user", user)
  var lobby = await Lobby.findOne({$and: [{ lobbyName: user.lobby }, { isPlaying: true }]});
  console.log("lobby", lobby.keyMaps, Object.keys(lobby.keyMaps), Object.keys(lobby.keyMaps).length)
  if (Object.keys(lobby.keyMaps).length > 3) return;
  console.log("continuing to create key maps")
  let keyMaps = {}
  let arr = [];
  for (let userId of userIds) {
    for (let i = 0; i < 4; i++) arr.push(userId);
  }
  shuffleArray(arr);
  let i = 0;
  let used = {};
  for (let userId of userIds) {
    used[userId] = [];
  }
  for (let userId of userIds) {
    for (let movement of movements) {
      let letter = String.fromCharCode(97 + getRandomInt(0, 26));

      // only 7 key mappings and need to add check to make sure letter is not repeated
      while (used[arr[i]].indexOf(letter) != -1) {
        letter = String.fromCharCode(97 + getRandomInt(0, 26));
      }
      keyMaps[arr[i]+","+letter] = [userId, movement];
      used[arr[i]].push(letter);
      console.log(userId, movement, arr[i], letter);
      i += 1;
    }
  }
  console.log("created key maps", keyMaps);
  
  let lobbyData = await Lobby.updateOne(
    { lobbyName: user.lobby },
    {
      $set: {
        keyMaps: keyMaps
      }
    }
  )
  console.log(lobbyData.keyMaps);
};

async function getPlayerAction(userid, key) {
  let user = await User.findOne({ _id: userid })
  let lobby = await Lobby.findOne({lobbyName: user.lobby })
  console.log("player action", lobby, userid+","+key, lobby.keyMaps.get(userid+","+key)); 
  return lobby.keyMaps.get(userid+","+key)
};

module.exports = {
  assignKeyMaps,
  someoneWon,
  gameOver,
  getPlayerAction,
  getUserIdsOfGame,
};
