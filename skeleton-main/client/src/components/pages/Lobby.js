import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";
import PlayerList from "../modules/PlayerList";

const Lobby = () => {
  const [Lobbyinfo, setLobby] = useState();

  useEffect(() => {
    get("/api/lobby", {lobbyName:}).then((lobby)=> {setLobby(lobby)})
  });

  return (
    <>
      {" "}
      <PlayerList playerlist={Lobbyinfo} />
    </>
  );
};

export default Lobby;
