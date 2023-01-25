import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import PlayerList from "../modules/PlayerList";
import { useNavigate } from "@reach/router";
import "./Lobby.css";
import url from "socket.io-client/lib/url.js";

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
  const [Lobbyinfo, setLobbyinfo] = useState({ userIds: [props.userId] });

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
  const navigate = useNavigate();
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

  const handleSubmit = (event) => {
    console.log("button clicked");
    event.preventDefault();
    onSubmit && onSubmit();
  };

  const onSubmit = () => {
    console.log("button clicked two");
    const body = { userId: props.userId, lobbyName: userLobby };
    console.log(body);
    post("/api/leavelobby", body).then(() => {
      console.log("api posted for leave lobby");
    });

    navigate("/");
  };

  //   if ({ userLobby }.userLobby !== "") {

  if (userLobby !== "") {
    return (
      <div className="move-down">
        <div className="buttons">
          <Link to="/game">
            <button className="buttonn hover">Start Game</button>
          </Link>
        </div>
        <div className="buttonstwo">
          <button className="buttonntwo hover" type="submit" onClick={handleSubmit}>
            Leave Game
          </button>
        </div>

        <img src="https://user-images.githubusercontent.com/51216389/87076088-a2c31c00-c1f7-11ea-9a18-e527bd1198cf.gif" />
        <div className="actual-stuff">
          <div className="right-thing">
            <h1 className="center-div">
              Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
            </h1>
            <h1 className="center-div">
              You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
            </h1>
          </div>
          <div className="playerlist">
            <PlayerList playerlist={Lobbyinfo} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {" "}
        <h1 className="center-div">
          Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
        </h1>
        <h1 className="center-div">
          <Link to="/">You are not in a lobby; go back to home</Link>
        </h1>
      </div>
    );
  }
};

export default Lobby;
