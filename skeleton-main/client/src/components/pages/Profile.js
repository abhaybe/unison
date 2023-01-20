import React, { useEffect } from "react";
import "./Profile.css";
import NewName from "../modules/NewName";

const Profile = (props) => {
  if (!props.userId) {
    return <div>Log in before playing</div>;
  }
  useEffect(() => {
    console.log("helooooo", props.userId);
  });

  return (
    <>
      <NewName userId={props.userId} />
      <p> This is your profile</p>
    </>
  );
};

export default Profile;
