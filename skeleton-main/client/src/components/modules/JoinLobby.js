import React from "react";
import { Link } from "@reach/router";
import "./JoinLobby.css";

const JoinLobby = () => {
  return (
    <div>
      <h3> Join a lobby!</h3>
      <input type="text" id="Name" name="Name" placeholder="Game Code"></input>
      <button>Submit</button>
    </div>
  );
};

export default JoinLobby;
