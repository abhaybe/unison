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
    <div className="card-container">
      <span className="pro">
        <i className="message fas fa-envelope"></i>
      </span>
      <div className="m-b-25">
        <img
          decoding="async"
          className="round img-radius"
          // src="https://weblab.mit.edu/public/img/logo.svg"
          src="https://web.mit.edu/graphicidentity/images/examples/tim-the-beaver-3.png"
          alt="user"
        />
      </div>

      <h2>{userName}</h2>
      <div>
        <NewName userId={props.userId} />
      </div>
      <hr></hr>
      <div className="buttons">
        <div className="skills">
          <h1 className="MainContainer-center">Statistics</h1>
          <ul>
            <li>Wins: {userWins}</li>
            <li>Games Played:</li>
            <li>Ranking: </li>
            <li>TBD</li>
            <li>TBD</li>
            <li>TBD</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;

{
  /* <div className="MainContainer-center">
        <p> This is your profile</p>
      </div>
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row container d-flex justify-content-center">
            <div className="col-xl-6 col-md-12">
              <div className="card user-card-full">
                <div className="row m-l-0 m-r-0">
                  <div className="col-sm-4 bg-c-lite-green user-profile">
                    <div className="card-block text-center text-white">
                      <div className="m-b-25">
                        <img
                          src="https://weblab.mit.edu/public/img/logo.svg"
                          className="img-radius"
                          alt="User-Profile-Image"
                        />
                      </div>
                      <h6 className="f-w-600">{userName}</h6>
                      <div>
                        {" "}
                        <NewName userId={props.userId} />
                      </div>
                      <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                    </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="card-block">
                      <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Statistics</h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Number of Wins</p>
                          <h6 className="text-muted f-w-400">{userWins}</h6>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">Games Played</p>
                          <h6 className="text-muted f-w-400">TO-DO (add number of games played)</h6>
                        </div>
                      </div>
                      <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">
                        Something Else TBD
                      </h6>
                      <div className="row">
                        <div className="col-sm-6">
                          <p className="m-b-10 f-w-600">TBD</p>
                          <h6 className="text-muted f-w-400">Yethir</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */
}
