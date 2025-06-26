import React, {useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
// import {allSightings} from '..api\Controllers\SightingReportsController.cs'

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
        <p key={sightingReport.userId}>{sightingReport.description}</p>
        ))
        ) : (
        <p>No approved sightings</p>
            )}
        </>
        );
    }

