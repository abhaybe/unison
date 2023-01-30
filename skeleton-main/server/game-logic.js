const gameState = {
  keyMaps: {},
  players: {},
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
let movements = ["up", "down", "left", "right"]
const assignKeyMaps = () => {
  let userIds = players
  let arr = []
  for (let userId of userIds){
    for (let i = 0; i< 4; i++) arr.push(userId)
  }
  shuffleArray(arr)
  let i = 0
  let used = {}
  for (let userId of userIds){
    user[userId] = []
  }
  for (let userId of userIds){
    for (let movement of movements){
      let letter = String.fromCharCode(65 + getRandomInt(0, 27))
      while (letter in used[arr[i]]){
        letter = String.fromCharCode(65 + getRandomInt(0, 27))
      }
      gameState.keyMaps[[arr[i], letter]] = [userId, movement]
      used[arr[i]].push(letter)
      i+=1
    }
  }
}

const getPlayerAction = (user, key) => {
  return gameState.keyMaps[[user, key]]
}

