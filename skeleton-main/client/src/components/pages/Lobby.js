import React, { useEffect, useState } from "react";
import { Link } from "@reach/router";
import { get, post } from "../../utilities.js";
import PlayerList from "../modules/PlayerList";
import { useNavigate } from "@reach/router";
import "./Lobby.css";
import url from "socket.io-client/lib/url.js";
import { socket } from "../../client-socket.js";
import "../../utilities.css";

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

  // if (!props.lobbyId) {
  //   return <div>blh</div>;
  // }
  const [userName, setName] = useState("");
  const [userId, setId] = useState(0);
  const [userLobby, setLobby] = useState("");
  const [userWins, setWins] = useState(0);
  const [Lobbyinfo, setLobbyinfo] = useState([props.userId]);
  const [popup, setPopup] = useState("hidden");

  useEffect(() => {
    navigate("/lobby");
    navigate("/lobby");
    navigate("/lobby");
  }, [userLobby]);

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
      console.log(" workkk", data, userLobby);
      if (data[1] === userLobby) {
        // console.log("please work", Lobbyinfo, String(data));
        setLobbyinfo((oldInfo) => {
          const arr = [...oldInfo, data[0]];
          console.log(" workkk", oldInfo, arr, data);
          return arr;
        });
      }
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
  }, [userLobby]);

  useEffect(() => {
    socket.on("gameWon", callBack);
    return () => {
      socket.off("gameWon", callBack);
    };
  });

  const callBack = (userList) => {
    console.log("hiiii");
    userList.forEach((obj) => {
      console.log(obj, props.userId);
      if (obj === props.userId) {
        setPopup("visible");
      }
    });
  };
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

  const onSubmitStart = (lobbyt) => {
    const body = { userId: props.userId, lobbyName: lobbyt };
    console.log(body);
    post("/api/incrementGamesPlayed", body).then(() => {
      console.log("gamesPlayed");
    });
    post("/api/setLobbyPlaying", body).then(() => {
      console.log("isPlaying set to true");
    });
    navigate("/game");
  };

  const onSubmitmake = () => {
    onSubmitStart(userLobby);
    post("/api/gameStart", { lobbyName: userLobby, lobbyList: Lobbyinfo });
    socket.emit("setGameState", Lobbyinfo);
  };

  useEffect(() => {
    const onApiCall = (data) => {
      if (data === userLobby) {
        onSubmitStart(data);
      }
    };

    socket.on("gameStart", onApiCall);

    return () => {
      socket.off("gameStart", onApiCall);
    };
  }, [userLobby]);
  //   if ({ userLobby }.userLobby !== "") {

  if (userLobby !== "") {
    return (
      <div className="move-down1 ">
        <div>
          <button className="Lobby-Button1 hover" onClick={onSubmitmake}>
            Start Game
          </button>
        </div>
        <div>
          <button className="Lobby-Button2 hover" type="submit" onClick={handleSubmit}>
            Leave Game
          </button>
        </div>
        <div className="imagee">
          <img src="https://user-images.githubusercontent.com/51216389/87076088-a2c31c00-c1f7-11ea-9a18-e527bd1198cf.gif" />
        </div>

        <div>
          <div>
            <h1 className="color-textt Lobby-PositionTitle">
              Hello <span className="gradient-text">{userName}</span>, let's play U&Ison!
            </h1>
            <h1 className="Lobby-PositionLobby color-textt">
              You are currently in Lobby: <span className="gradient-text">{userLobby}</span>
            </h1>
          </div>
          <div className="playerlist">
            <PlayerList playerlist={Lobbyinfo} />
          </div>
          <div style={{ visibility: true }} className="Winner-Show">
            <h3>
              Congragulations! You and your team completed the maze in{" "}
              <span className="gradient-text">"insert time"</span> seconds! Play again to improve
              your time!
            </h3>
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
