import { useState, useEffect } from "react";
import { fetchSightings, SightingReport } from "../../api/ApiClient";
import "./Leaderboard.scss";

export function Leaderboard() {
  const [sightings, setSightings] = useState<SightingReport[]>([]);
  const [topUsers, setTopUsers] = useState<{ name: string; value: number }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    fetchSightings().then((response) => {
      const approvedSightings = response.filter(
        (sighting) => sighting.status.toLowerCase() === "approved"
      );
      setSightings(approvedSightings);
    });
  }, []);

  useEffect(() => {
    const usersMap = new Map();
    sightings.forEach(({ userName }) => {
      usersMap.set(userName, (usersMap.get(userName) || 0) + 1);
    });

    const usersArray = Array.from(usersMap, ([name, value]) => ({
      name,
      value,
    })).sort((a, b) => (a.value > b.value ? -1 : b.value > a.value ? 1 : 0));
    const topUsersArray =
      usersArray.length < 3
        ? usersArray.slice(0, usersArray.length)
        : usersArray.slice(0, 3);
    setTopUsers(topUsersArray);
    setLoading(false);
  }, [sightings]);
  if (topUsers.length === 0) {
    return (
      <div className="leaderboard">
        <h2 className="header">Top 3 Whale Watchers</h2>
        <p className="info-message">
          Whale, isn&#8217;t this fin-teresting? Looks like no one&#8217;s seen
          any whales yet...
        </p>
      </div>
    );
  }
  return (
    <div className="leaderboard">
      <h2 className="header">Top 3 Whale Watchers</h2>
      <table>
        <colgroup>
          <col className="narrow-col" />
          <col className="wide-col" />
          <col className="narrow-col" />
        </colgroup>
        <thead className="table-header">
          <tr>
            <th>Position</th>
            <th>Username</th>
            <th>Sightings</th>
          </tr>
        </thead>
        <tbody>
          {loading ? <p className="info-message">Loading...</p> : null}
          {topUsers.map((user) => (
            <tr key={user.name}>
              <td>{topUsers.indexOf(user) + 1}</td>
              <td>{user.name}</td>
              <td>{user.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
