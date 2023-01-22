import React, { useState, useEffect } from "react";
import "./Leader.css";

const Leader = (props) => {
  return (
    <>
      {props.user.username} {"-"} {props.user.wins}
    </>
  );
};

export default Leader;
