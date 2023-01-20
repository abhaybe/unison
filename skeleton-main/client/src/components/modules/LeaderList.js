import React, { useState, useEffect } from "react";
import Leader from "./Leader";
const LeaderList = (props) => {
  return props.users.map((oneuser) => <Leader user={oneuser} />);
};

export default LeaderList;
