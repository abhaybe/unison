import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
import jwt_decode from "jwt-decode";

import NotFound from "./pages/NotFound.js";
import Skeleton from "./pages/Skeleton.js";
import NavBar from "./modules/NavBar.js";
import Profile from "./pages/Profile.js";
import Leaderboard from "./pages/Leaderboard.js";
import Lobby from "./pages/Lobby.js";
import Game from "./pages/Game.js";

import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

/**
 * Define the "App" component
 */
const App = () => {
  const [userId, setUserId] = useState(undefined);
  const [userName, setName] = useState("");

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registered in the database, and currently logged in.
        setUserId(user._id);
        setName(user.username);
      }
    });
  });

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
      <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} />
      <Router>
        <Skeleton path="/" userId={userId} userName={userName} />
        <NotFound default />
        <Profile path="/profile" userId={userId} />
        <Leaderboard path="/leaderboard" />
        <Lobby path="/lobby" userId={userId} userName={userName} />
        <Game path="/game" />
      </Router>
    </>
  );
};

export default App;
