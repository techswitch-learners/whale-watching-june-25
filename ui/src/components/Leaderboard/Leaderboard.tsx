import { useState, useEffect } from "react";
import { fetchSightings, SightingReport } from "../../api/ApiClient";

export function Leaderboard() {
  const [sightings, setSightings] = useState<SightingReport[]>([]);
  const [topUsers, setTopUsers] = useState<{name: string, value: number}[]>([]);

    useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved');
            setSightings(approvedSightings); 
        });  
    }, []);

    useEffect(() => {
      const usersMap = new Map();
      sightings.forEach(({ userName }) => {
        usersMap.set(userName, (usersMap.get(userName) || 0) + 1);
      });

      const usersArray = Array.from(usersMap, ([name, value]) => ({name, value})).sort((a,b) => (a.value > b.value ? -1: b.value > a.value ? 1 : 0));
      const topUsersArray = usersArray.length < 3 ? usersArray.slice(0, usersArray.length) : usersArray.slice(0, 3);
      setTopUsers(topUsersArray);
    }, [sightings]);
       

    return (
        <div>
          <h2 className="leaderBoard">Leaderboard</h2>
        <table>
          <thead>
            <tr>
              <th>
                position
              </th>
              <th> 
                username
              </th>
              <th> 
                sightings
              </th>
            </tr>
          </thead>
          <tbody>
            {topUsers.length === 0 ? <p>Whale, isn't this fin-teresting? Looks like no one&#8217;s seen any whales yet...</p> :
            topUsers.map((user) => 
              <tr key={user.name}>
                <td>
                  {topUsers.indexOf(user) + 1}
                </td>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.value}
                </td>
              </tr>
            )
            }
          </tbody>
        </table>
        </div>
        )

    }