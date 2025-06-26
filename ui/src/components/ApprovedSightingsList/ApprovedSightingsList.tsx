import React, {useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
import { fetchSightings, SightingReport } from "../../../api/ApiClient";

export function ApprovedSightingsList() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);

    useEffect(() => {
        fetchSightings().then((response) => {
            setSightings(response);
        });
    }, []);


const ApprovedSightings = sightings.filter(sighting => sighting.status === 'approved');
    
    return (
     <>
     {ApprovedSightings.length > 0 ? (
         ApprovedSightings.map((sightingReport: SightingReport) => (
      <>
            <p>Date of sighting: {new Date(sightingReport.dateOfSighting).toString()}</p>
             <p>Sighting latitude: {sightingReport.latitude} Sighting longitude:{sightingReport.longitude}</p>
            <p>Sighting description: {sightingReport.description}</p>
            <p>Whale species:{sightingReport.speciesId}</p></> //need to link species id to whale table for more info?
            //image to go here 
        ))
        ) : (
        <p>No approved sightings</p>
            )}
        </>
        );
    }





//Why can't we use the return from get all sightings endpoint for this? Why do we do a new fetch in api client?

// import React, {useState, useEffect } from "react";
// import "./ApprovedSightingsList.scss";
// import {allSightings} from '..api\Controllers\SightingReportsController.cs'
// import { fetchSightings, SightingReport } from "../../../api/ApiClient";

// export function ApprovedSightingsList(allSightings: any[]) {

//     // const [sightings, setSightings] = useState<SightingReport[]>([]);

//     // useEffect(() => {
//     //     fetchSightings().then((response) => {
//     //         setSightings(response);
//     //     });
//     // }, []);

//     console.log(allSightings)

// const ApprovedSightings = allSightings.filter(sighting => sighting.status === 'approved');
    
//     return (
//      <>
//      {ApprovedSightings.length > 0 ? (
//          ApprovedSightings.map((sighting) => (
//         <p key={sighting.userId}>{sighting.description}</p>
//         ))
//         ) : (
//         <p>No approved sightings</p>
//             )}
//         </>
//         );
//     }

