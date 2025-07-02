import { useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";

import { ApprovedSightingsList } from "../ApprovedSightingsList/ApprovedSightingsList";
import { fetchSightings } from "../../api/ApiClient";

export default function LeaderBoard() {
  return <div className="leaderBoard">Leaderboard</div>;
}

async function TopUsers() {
  const rawApprovedList = await fetchSightings();
  const uniqueUserNames = rawApprovedList.filter(
    (obj, index, self) =>
      index === self.findIndex((t) => t.userName === obj.userName)
  );

  return (
    <>
      {data.map((User, index) => (
        <div className="flex" key={index}>
          <div className="topUser">
            {/* <img src={value.img} alt="" /> */}
            <div className="info">
              <h3 className="name text-dark">{Rank}</h3>
            </div>
            <div className="info">
              <h3 className="name text-dark">{topUser.userName}</h3>
            </div>
          </div>
          <div className="item">
            <span>{spottingTotal}</span>
          </div>

          {/* most recent spot? */}
        </div>
      ))}
    </>
  );
}
