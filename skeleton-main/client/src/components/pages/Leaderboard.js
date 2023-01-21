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
    <div className="center-div">
      <h1 className="center-title">Global Leaderboard</h1>
      <body>
        <table class="content-table">
          <tbody>
            <tr>
              <td>
                {" "}
                <LeaderList users={Leaders} />{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </body>
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
  );
};

export default Leaderboard;
