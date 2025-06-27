import React, { useState, useEffect } from "react";
import "./PendingSightingList.scss";
// Update the import path below if your ApiClient file is located elsewhere
import { fetchSightings, SightingReport } from "../../../api/ApiClient";

export function PendingSightingsList() {
  const [pendingSightings, setPendingSightings] = useState<SightingReport[]>(
    []
  );

  useEffect(() => {
    fetchSightings().then((response: SightingReport[]) => {
      setPendingSightings(response);
    });
  }, []);

  if (!pendingSightings) {

    return <p>No Pending Sightings to Approve</p>
  }


  return (


    <>
      {pendingSightings &&
        pendingSightings.map((sightingReport: SightingReport) => {
          console.log(sightingReport.description);
          return <p>{sightingReport.description}</p>;
        })}
    </>
  );
}


export default function PendingSightingsTable() {
      return (
        <div className="App">
            <table />
                <tr />
                    <th>Description</th>
                    <th>Date of Sighting</th>
                    <th>Location</th>
                    <th>Species</th>
                    <th>User</th>
                    
                


                {/* {data.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.name}</td>
                            <td>{val.age}</td>
                            <td>{val.gender}</td>
                        </tr> */}
                    )
              
            
        </div>
    );
}


