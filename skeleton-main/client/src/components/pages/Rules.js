import React, { useState, useEffect } from "react";
import "./Rules.css";
import { Link } from "@reach/router";

const Rules = (props) => {
  return (
    <main className="grid">
      <div className="box">
        Hey there! Welcome to U&Ison! It's pretty amazing that you stumbled upon such a disting
        <span className="gradient-text">ui</span>shed site! But don't get too excited yet, let's
        learn how to play first:
      </div>
      <div className="box1">
        1. Create or join a lobby with three other players. Make sure your lobby name is not eq
        <span className="gradient-text1">ui</span>valent to existing lobbies!
      </div>
      <div className="box2">
        2. Once all of you and your friends are in the lobby, click the "Start" button to begin!
        Each player will receive a <span className="gradient-text2">uni</span>que maze; the
        objective of the game is to reach the red box as q<span className="gradient-text2">ui</span>
        ckly as possible. Each player has four simple movement options (up, right, down, left) that
        are randomly mapped to a random alphabetical keyboard input of a random player. Remember,
        comm<span className="gradient-text2">uni</span>cation is key!
      </div>
      <div className="box3">
        3. Compete with other players to achieve the fastest time! Those who cr
        <span className="gradient-text3">ui</span>se through the q
        <span className="gradient-text3">ui</span>ckest will have their names displayed on the{" "}
        <Link to="/leaderboard">Global Leaderboard</Link>.
      </div>
      <div className="box4">
        4. Make sure to \view your statistics and customize your username in the{" "}
        <Link to="/profile">Profile</Link> page! With that, you're ready to to play! Hopefully you
        and your friends can work together in <span class="demo rainbow">UNISON</span>!
      </div>
    </main>
  );
};

export default Rules;
