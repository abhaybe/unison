import React, { useState, useEffect } from "react";
import { post } from "../../utilities";

import "./NewName.css";

const NewName = (props) => {
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit && onSubmit(value);
    location.reload();
    setValue("");
  };

  const onSubmit = (valuet) => {
    const body = { userId: props.userId, username: valuet };
    console.log(body);
    post("/api/username", body).then(() => {
      console.log("api posted");
    });
  };

  return (
    <>
      <div>
        <input type="text" placeholder="Type new username" value={value} onChange={handleChange} />
      </div>
      <div>
        <button
          type="submit"
          className="NewPostInput-button u-pointer"
          value="Submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default NewName;
