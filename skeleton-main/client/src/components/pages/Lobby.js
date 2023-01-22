import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get } from "../../utilities";

const Lobby = () => {
  const [Lobbyinfo, setLobby] = useState();

  useEffect(() => {
    get("/api/lobby");
  });

  return <></>;
};

export default Lobby;
