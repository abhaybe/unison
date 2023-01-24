import React, { useState, useEffect } from "react";
import { get, post } from "../../utilities";
// import "./Player.css";

const Player = (props) => {
  const [userName, setName] = useState(props.user);

  useEffect(() => {
    get("/api/getuser", { userId: props.user }).then((userr) => {
      console.log(userr);
      setName(userr.username);
    });
  });
  return <>{userName}</>;
};

export default Player;
