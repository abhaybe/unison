let io;

const userToSocketMap = {}; // maps user ID to socket object
const socketToUserMap = {}; // maps socket ID to user object

const gameLogic = require("./game-logic");

const getSocketFromUserID = (userid) => userToSocketMap[userid];
const getUserFromSocketID = (socketid) => socketToUserMap[socketid];
const getSocketFromSocketID = (socketid) => io.sockets.connected[socketid];

const addUser = (user, socket) => {
  const oldSocket = userToSocketMap[user._id];
  if (oldSocket && oldSocket.id !== socket.id) {
    // there was an old tab open for this user, force it to disconnect
    // FIXME: is this the behavior you want?
    oldSocket.disconnect();
    delete socketToUserMap[oldSocket.id];
  }

  userToSocketMap[user._id] = socket;
  socketToUserMap[socket.id] = user;
};

const removeUser = (user, socket) => {
  if (user) delete userToSocketMap[user._id];
  delete socketToUserMap[socket.id];
};

module.exports = {
  init: (http) => {
    io = require("socket.io")(http);

    io.on("connection", (socket) => {
      console.log(`socket has connected ${socket.id}`);
      socket.on("disconnect", (reason) => {
        const user = getUserFromSocketID(socket.id);
        removeUser(user, socket);
      });
      socket.on("serverStartMove", (input) => {
        // Listen for moves from client and move player accordingly
        // console.log(input.user + " " + input.action);
        let action = gameLogic.getPlayerAction(input.user, input.action)
        if (action) io.emit("startMove", action);
        // if (user) gameLogic.movePlayer(user._id, dir);
      });
      socket.on("serverEndMove", (input) => {
        let action = gameLogic.getPlayerAction(input.user, input.action)
        if (action) io.emit("endMove", action);
      })
      socket.on("setGameState", (input) => {
        gameLogic.addPlayers(input);
        console.log("blahhhh", input, gameLogic.gameState.players);
        gameLogic.assignKeyMaps();
        console.log(gameLogic.gameState);
      });
    });
  },

  addUser: addUser,
  removeUser: removeUser,

  getSocketFromUserID: getSocketFromUserID,
  getUserFromSocketID: getUserFromSocketID,
  getSocketFromSocketID: getSocketFromSocketID,
  getIo: () => io,
};
