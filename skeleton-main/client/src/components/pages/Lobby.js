import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import PlayerList from "../modules/PlayerList";

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
  const [Lobbyinfo, setLobbyinfo] = useState({ userIds: ["hello", "hi"] });

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
    get("/api/getuser", { userId: props.userId }).then((user) => {
      setName(user.username);
      setId(user._id);
      setLobby(user.lobby);
      console.log(user.lobby);
      console.log({ userLobby }.userLobby);
      setWins(user.wins);
      get("/api/lobby", { lobbyName: user.lobby })
        .then((lobby) => {
          setLobbyinfo(lobby);
        })
        .then(() => {
          console.log("done", Lobbyinfo);
        });
    });
  }, []);

  //   if ({ userLobby }.userLobby !== "") {
  return (
    <div>
      {" "}
      <h1 className="center-div">
        Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
      </h1>
      <h1 className="center-div">
        You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
      </h1>
      <PlayerList playerlist={Lobbyinfo} />
      <Link to="/game">
        <button>Start Game</button>
      </Link>
      <Link to="/">
        <button>Leave Game</button>
      </Link>
    </div>
  );
  //   }
  //   } else {
  //     return (
  //       <div>
  //         {" "}
  //         <h1 className="center-div">
  //           Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
  //         </h1>
  //         <h1 className="center-div">
  //           You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
  //         </h1>
  //       </div>
  //     );
  //   }
};

export default Lobby;
