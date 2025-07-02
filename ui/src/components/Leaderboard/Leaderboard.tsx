import { useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
import { fetchSightings, SightingReport } from "../../api/ApiClient";

export default function LeaderBoard() {
  return <div className="leaderBoard">Leaderboard</div>;
}

async function TopUsers() {
  const rawApprovedList: SightingReport[] = await fetchSightings();
      const topUserMap = new Map();
    rawApprovedList.forEach(({ userName }) => {
      topUserMap.set(userName, (topUserMap.get(userName) || 0) + 1);
    });
  }




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
