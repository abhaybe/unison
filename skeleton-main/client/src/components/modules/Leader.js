import React, { useState, useEffect } from "react";
import "./Leader.css";

const Leader = (props) => {
  return (
    <div className="leaderObject">
      {props.user.username} {"-"} {props.user.wins}
    </div>
  );
};

export default Leader;
