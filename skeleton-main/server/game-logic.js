const gameState = {
  keyMaps: {},
  players: {},
};

const addPlayers = (lobbylist) => {
  lobbylist.forEach((obj) => {
    gameState.players[obj] = 0;
  });
};

const someoneWon = (userId) => {
  gameState.players[userId] = 1;
};

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
const assignKeyMaps = () => {
  if (Object.keys(gameState.keyMaps).length != 0) return;
  let userIds = Object.keys(gameState.players);
  let arr = [];
  for (let userId of userIds) {
    for (let i = 0; i < 4; i++) arr.push(userId);
  }
  shuffleArray(arr);
  let i = 0;
  let user = {};
  for (let userId of userIds) {
    user[userId] = [];
  }
  for (let userId of userIds) {
    for (let movement of movements) {
      let letter = String.fromCharCode(97 + getRandomInt(0, 26));

      // only 7 key mappings and need to add check to make sure letter is not repeated
      while (user[arr[i]].indexOf(letter) != -1) {
        letter = String.fromCharCode(97 + getRandomInt(0, 26));
      }
      gameState.keyMaps[[arr[i], letter]] = [userId, movement];
      user[arr[i]].push(letter);
      // console.log(userId, movement, arr[i], letter);
      i += 1;
    }
  }
  // console.log(gameState.keyMaps);
};

const getPlayerAction = (user, key) => {
  return gameState.keyMaps[[user, key]];
};

// data= keymaps

module.exports = {
  gameState,
  addPlayers,
  assignKeyMaps,
  someoneWon,
  getPlayerAction,
};
