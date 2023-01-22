import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";

const Lobby = (props) => {
  if (!props.userId) {
    return <div>Log in before playing</div>;
  }
  // if (!props.lobbyId) {
  //   return <div>blh</div>;
  // }
  const [userName, setName] = useState("");
  const [userId, setId] = useState(0);
  const [userLobby, setLobby] = useState("");
  const [userWins, setWins] = useState(0);
  const [Lobbyinfo, setLobbyinfo] = useState();

  // useEffect(() => {
  //   get("/api/getlobby", { lobbyId: props.lobbyId })
  //     .then((user) => {
  //       setLobby(user.lobby);
  //       console.log("hello two", user._id);
  //       console.log("hi", user);
  //     })
  //     .then(() => {
  //       console.log("hello two", userId);
  //     });
  // });

  useEffect(() => {
    get("/api/getuser", { userId: props.userId })
      .then((user) => {
        setName(user.username);
        setId(user._id);
        setLobby(user.lobby);
        setWins(user.wins);
      })
      .then(() => {});
  });
  console.log({ userLobby }.userLobby);

  useEffect(() => {
    get("/api/lobby", { lobbyName: userLobby }).then((lobby) => {
      setLobbyinfo(lobby);
    });
  });

  return (
    <>
      {" "}
      <PlayerList playerlist={Lobbyinfo} />
    </>
  );
};

export default Lobby;
