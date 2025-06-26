import React, {useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
// Update the import path below if your ApiClient file is located elsewhere
import { fetchSightings, SightingReport } from "../../../api/ApiClient";

export function ApprovedSightingsList() {

    const [approvedSightings, setApprovedSightings] = useState<SightingReport[]>([]);

    useEffect(() => {
        fetchSightings().then((response) => {
            setApprovedSightings(response);
        });
    }, []);

    return (
        <>
        {approvedSightings && approvedSightings.map((sightingReport: SightingReport) => {
            console.log(sightingReport.description);
            return <p>{sightingReport.description}</p>;
        })}
        </>
    )
}
