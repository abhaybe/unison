const gameState = {
  keyMaps: {},
  players: {},
};

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
};

// keyMaps: {[userid, movement]:[userid, letter]}
function assignKeyMaps(keyMaps) {
  let step = 0;
  for (let i = 0; i < 4; i++) {
    let keyMapskeys = [];
  }
}
