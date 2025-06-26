import React, {useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";


export function ApprovedSightingsList() {

    const [approvedSightings, setApprovedSightings] = useState<any[]>([]);

    useEffect(() => {
        fetch("http://localhost:5067/sightingreports/all").then(response => response.json()).then(data => {
            setApprovedSightings(data);
    })
    }, []);

    // console.log(approvedSightings)


    return (
        <>
        {approvedSightings && approvedSightings.map((sightingReport: any) => {
            console.log(sightingReport);
            return <p key={sightingReport.id}>{sightingReport.description}</p>;
        })}
        </>
    )
}
