import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import PlayerList from "../modules/PlayerList";
import { useNavigate } from "@reach/router";
import "./Lobby.css";
import url from "socket.io-client/lib/url.js";
import { socket } from "../../client-socket.js";

const Lobby = (props) => {
  if (!props.userId) {
    return (
      <div>
        {" "}
        <h1 className="center-div move-downagain">
          <Link to="/">Please log in to play U&Ison.</Link>
        </h1>
      </div>
    );
  }

  useEffect(() => {
    navigate("/lobby");
  }, [userLobby]);

  // if (!props.lobbyId) {
  //   return <div>blh</div>;
  // }
  const [userName, setName] = useState("");
  const [userId, setId] = useState(0);
  const [userLobby, setLobby] = useState("");
  const [userWins, setWins] = useState(0);
  const [Lobbyinfo, setLobbyinfo] = useState([props.userId]);

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
          setLobbyinfo(lobby.userIds);
        })
        .then(() => {
          console.log("done", Lobbyinfo);
        });
    });
  }, []);

  useEffect(() => {
    const callSocket = (data) => {
      // console.log("please work", Lobbyinfo, String(data));
      setLobbyinfo((oldInfo) => {
        const arr = [...oldInfo, data];
        console.log(" workkk", oldInfo, arr, data);
        return arr;
      });
      // console.log(Lobbyinfo);
      // setList(Array(new Set(userlist)));
      // userlist = [...new Set(userlist)];
      // setList((userlist) => new Set(userlist).add(data));
      //   if (trimmed && !categories.includes(trimmed)) {
      //     setCategories(prevState => prevState.concat(trimmed));
      //   }
      // };
    };

    const leaveSocket = (data) => {
      // console.log("please work", Lobbyinfo, String(data));
      setLobbyinfo((oldInfo) => {
        const arr = oldInfo.map((shape) => {
          if (shape !== data) {
            return shape;
          }
          return "";
        });
        return arr;
      });
    };
    socket.on("lobbySocket", callSocket);
    socket.on("lobbyLeave", leaveSocket);
    return () => {
      socket.off("lobbySocket", callSocket);
      socket.off("lobbyLeave", leaveSocket);
    };
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
      <div className="move-down1">
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
        <div className="imagee">
          <img src="https://user-images.githubusercontent.com/51216389/87076088-a2c31c00-c1f7-11ea-9a18-e527bd1198cf.gif" />
        </div>

        <div className="actual-stuff">
          <div className="right-thing">
            <h1 className="center-div color-textt">
              Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
            </h1>
            <h1 className="center-div color-textt">
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
    navigate("/lobby");
    return (
      <div>
        {" "}
        <h1 className="center-div move-downagain">
          <Link to="/">You are not in a lobby; click to go back to home.</Link>
        </h1>
      </div>
    );
  }
};

export default Lobby;
