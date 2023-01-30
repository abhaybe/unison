import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import LeaderList from "../modules/LeaderList";
// import { get } from "mongoose";
import { get } from "../../utilities";
import "../../utilities.css";

const Leaderboard = () => {
  const [Leaders, setLeaders] = useState([]);

  useEffect(() => {
    get("/api/scores").then((leaders) => {
      setLeaders(leaders);
    });
  }, []);

  return (
    <div className="move-down-Leaderboard bring-behind">
      <div className="center-div color-textx">
        <img
          src="https://cdn-icons-png.flaticon.com/512/6941/6941697.png"
          alt="Trulli"
          width="50"
          height="50"
        />

        <h1 className="center-title">Global Leaderboard</h1>
        <table className="content-table">
          <tbody>
            <tr>
              <td>
                {" "}
                <LeaderList users={Leaders} />{" "}
              </td>
            </tr>
          </tbody>
        </table>
        {/* <table className="styled-table">
        <tbody>
          <tr className="active-row">
            <td>
              {" "}
              <LeaderList users={Leaders} />{" "}
            </td>
          </tr>
        </tbody>
      </table> */}
      </div>
    </div>
  );
};

export default Leaderboard;
