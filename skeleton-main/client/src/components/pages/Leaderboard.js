import React, { useEffect, useState } from "react";
import "./Leaderboard.css";
import LeaderList from "../modules/LeaderList";
// import { get } from "mongoose";
import { get } from "../../utilities";

const Leaderboard = () => {
  const [Leaders, setLeaders] = useState([]);

  useEffect(() => {
    get("/api/scores").then((leaders) => {
      setLeaders(leaders);
    });
  }, []);

  return (
    <div className="move-down bring-behind">
      <div className="center-div">
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
