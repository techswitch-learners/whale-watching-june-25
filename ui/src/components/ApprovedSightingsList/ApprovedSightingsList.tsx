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

