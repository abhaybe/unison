import React, { useState } from "react";
import { Link, useNavigate } from "@reach/router";
import "./CreateLobby.css";
import { get, post } from "../../utilities";

const CreateLobby = (props) => {
  const [value, setValue] = useState("");
  const [popup, setPopup] = useState("hidden");
  const navigate = useNavigate();

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value);
    setValue("");
  };

  const onSubmit = (value) => {
    console.log("nope", props.userId);

    get("/api/lobby", { lobbyName: value }).then((lobby) => {
      console.log("this is", lobby);
      if (lobby.lobbyName !== "") {
        console.log("Lobby exists already");
        setPopup("visible");
      } else {
        post("/api/lobby", { lobbyName: value, userId: props.userId });
        post("/api/userlobby", { userId: props.userId, lobby: value });
        navigate("/lobby");
      }
    });
  };
  return (
    <div className="CreateLobby-center text-color">
      <h3> Create a Lobby!</h3>
      <div>{/* <p>{props.userName}</p> */}</div>
      <div>
        <div style={{ visibility: popup }} className="popup Duplicate-Lobbytwo">
          Lobby already exists! Please use a different lobby name.
        </div>
        <input
          className="CreateLobby-TextEntry focus"
          type="text"
          placeholder="Game Code:"
          value={value}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          type="submit"
          className="NewPostInput-button u-pointer CreateLobby-Button hover"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateLobby;
