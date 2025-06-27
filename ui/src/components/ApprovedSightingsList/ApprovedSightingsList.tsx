import React, {useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
import { fetchSightings, SightingReport } from "../../../api/ApiClient";
import {format} from 'date-fns';

export function ApprovedSightingsList() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);

    useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status === 'approved')
            .sort((a, b) => new Date(b.dateOfSighting).getDate() - new Date(a.dateOfSighting).getDate());
            setSightings(approvedSightings);
        });
    }, []);


    // const ApprovedSightings = sightings
    //     .filter(sighting => sighting.status === 'approved')
    //     .sort((a, b) => new Date(b.dateOfSighting).getDate() - new Date(a.dateOfSighting).getDate());
    
    return (
     <>
     <h2 id="sightings-list-header">Sightings</h2>
    <div className="sighting-list-container">
     {sightings.length > 0 ? (
        <>
            <div className="sighting-container">
                <table className= "approved-sightings-table">
                    <thead className="approved-sightings-table-header">
                        <th>Date of sighting: </th>
                        <th>Species: </th>
                        <th>Sighting latitude: </th>
                        <th>Sighting longitude: </th>
                        <th>Username: </th>
                        <th>Description: </th>
                    </thead>
                    <tbody>
                        {sightings.map((sightingReport: SightingReport) => 
                            <tr>
                                <td>{format(new Date(sightingReport.dateOfSighting), 'dd-MM-yyyy')}</td>
                                <td>{sightingReport.speciesId}</td>
                                <td>{sightingReport.latitude}</td>
                                <td>{sightingReport.longitude}</td>
                                <td>{sightingReport.userId}</td>
                                <td>{sightingReport.description}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            </> 
        ) : (
        <p>No approved sightings</p>
            )}
    </div>
        </>
        );
    }

