import React, { useState } from "react";
import { Link, useNavigate } from "@reach/router";
import "./JoinLobby.css";
import { get, post } from "../../utilities";

const JoinLobby = (props) => {
  const [value, setValue] = useState("");
  const [popup, setPopup] = useState("hidden");
  const [popupStart, setPopupStart] = useState("hidden");

  const navigate = useNavigate();

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit(value);
    setValue("");
  };

  const onSubmit = (value) => {
    console.log("nope", props.userId);
    // post("/api/lobby", { lobbyName: value, userId: props.userId });
    get("/api/lobby", { lobbyName: value }).then((lobby) => {
      console.log("this is", lobby);
      if (lobby.lobbyName === "") {
        console.log("Lobby doesn't exist");
        setPopup("visible");
      } else if (lobby.isPlaying === true) {
        console.log("game in progress");
        setPopupStart("visible");
      } else {
        post("/api/lobby", { lobbyName: value, userId: props.userId });
        post("/api/userlobby", { userId: props.userId, lobby: value });
        navigate("/lobby");
      }
    });
  };
  return (
    <div className="JoinLobby-center text-color">
      <h3 className="paddingmove"> Join a Lobby!</h3>
      <div>{/* <p>{props.userName}</p> */}</div>
      <div>
        <div style={{ visibility: popup }} className="popup Duplicate-Lobby">
          Lobby does not exist!
        </div>
        <div style={{ visibility: popupStart }} className="popup GameStart-Lobby">
          Game is already in progress!
        </div>
        <input
          className="JoinLobby-TextEntry focus"
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

export default JoinLobby;
