import { get } from "mongoose";
import React, { useState, useEffect } from "react";
// import "./Player.css";

const Player = (props) => {
  // const [userName, setName] = useState("63cf1466d36fb932149cd4ae");

  // useEffect(() => {
  //   get("/api/getuser", { userId: props.user }).then((userr) => {
  //     console.log(user);
  //     setName(userr.username);
  //   });
  // }, [props.user]);
  return <>{props.userId}</>;
};

export default Player;
