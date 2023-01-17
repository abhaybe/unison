import React, { useState } from "react";
import { Link } from "@reach/router";
import "./JoinLobby.css";

const JoinLobby = () => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleChangeTwo = (event) => {
    setName(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  //   const handleSubmit = (event) => {
  //     event.preventDefault();
  //     props.onSubmit && props.onSubmit(value);
  //     setValue("");
  //   };

  return (
    <div>
      <h3> Join a Lobby!</h3>
      <div>
        <input type="text" placeholder="Username:" value={name} onChange={handleChangeTwo} />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          //   onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
      <div>
        <input type="text" placeholder="Game Code:" value={value} onChange={handleChange} />
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          //   onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default JoinLobby;
