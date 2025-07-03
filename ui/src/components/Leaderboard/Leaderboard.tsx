import { useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
import { fetchSightings, SightingReport } from "../../api/ApiClient";

export function Leaderboard() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);
 

    useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status === 'approved');
            setSightings(approvedSightings); 
        });  
    }, []);

    const userSightingsMap = new Map();
    sightings.forEach(({ userName }) => {
      userSightingsMap.set(userName, (userSightingsMap.get(userName) || 0) + 1);
    });

    const userSightingsArray = Array.from(userSightingsMap, ([name, value]) => ({name, value})).sort((a,b) => (a.value > b.value ? 1: b.value > a.value ? -1 : 0)).slice(0, 3);
    console.log(userSightingsArray[0] + "\n" + userSightingsArray[1] + "\n" + userSightingsArray[2]);    

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
          {userSightingsArray.length === 0 ? <h3>No one's seen any whales!</h3> :
          userSightingsArray.map((user) => 
            <tr>
              <td>
                {userSightingsArray.indexOf(user) + 1}
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