import React, { useState, useEffect } from "react";

const Leader = (props) => {
  return (
    <div>
      {props.user.username}
      {props.user.wins}
    </div>
  );
};

export default Leader;
