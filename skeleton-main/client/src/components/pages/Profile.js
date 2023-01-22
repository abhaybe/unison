import React, { useState, useEffect } from "react";
import "./Profile.css";
import NewName from "../modules/NewName";
import { get, post } from "../../utilities.js";

const Profile = (props) => {
  if (!props.userId) {
    return <div className="NoLogin-container NoLogin-textcenter">Log in before playing</div>;
  }
  useEffect(() => {
    console.log("helooooo", props.userId);
  });
  const [userName, setName] = useState("");
  const [userId, setId] = useState(0);
  const [userWins, setWins] = useState(0);
  useEffect(() => {
    get("/api/getuser", { userId: props.userId })
      .then((user) => {
        setName(user.username);
        setId(user._id);
        setWins(user.wins);
        console.log("hello two", user._id);
        console.log("hi", user);
      })
      .then(() => {
        console.log("hello two", userId);
      });
  });
  return (
    <>
      <div className="MainContainer-center">
        <p> This is your profile</p>
      </div>
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
              <div class="card user-card-full">
                <div class="row m-l-0 m-r-0">
                  <div class="col-sm-4 bg-c-lite-green user-profile">
                    <div class="card-block text-center text-white">
                      <div class="m-b-25">
                        <img
                          src="https://weblab.mit.edu/public/img/logo.svg"
                          class="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 class="f-w-600">{userName}</h6>
                      <p>
                        {" "}
                        <NewName userId={props.userId} />
                      </p>
                      <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div class="col-sm-8">
                    <div class="card-block">
                      <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Statistics</h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Number of Wins</p>
                          <h6 class="text-muted f-w-400">{userWins}</h6>
                        </div>
                      </div>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Games Played</p>
                          <h6 class="text-muted f-w-400">TO-DO (add number of games played)</h6>
                        </div>
                      </div>
                      <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Something Else TBD</h6>
                      <div class="row">
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">TBD</p>
                          <h6 class="text-muted f-w-400">Yethir</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
