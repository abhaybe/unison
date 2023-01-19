import React from "react";
import "./Profile.css";

const Profile = (props) => {
  if (!props.userId) {
    return <div>Log in before playing</div>;
  }
  return (
    <>
      <p> This is your profile</p>
    </>
  );
};

export default Profile;
