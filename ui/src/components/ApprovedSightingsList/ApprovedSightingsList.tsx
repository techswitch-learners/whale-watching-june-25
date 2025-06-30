import React, {useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
import { fetchSightings, SightingReport, fetchSeaLocation } from "../../../api/ApiClient";
import {format} from 'date-fns';


export function ApprovedSightingsList() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);
    const [seaData, setSeaData] = useState<Map<number, string>>(new Map());

    useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status === 'approved')
            .sort((a, b) => new Date(b.dateOfSighting).getDate() - new Date(a.dateOfSighting).getDate());
            setSightings(approvedSightings); 
        });  
    }, []);

    useEffect(() => {
        if (!sightings) return;
        sightings.forEach(sighting => {
        fetchSeaLocation(sighting.latitude, sighting.longitude).then(response =>
        {
            setSeaData(prev => {
                const updated = new Map(prev);
                updated.set(sighting.id, response);
                return updated;
            })
        }
        );
        })
    }, [sightings]);
    
    return (
     <>
     <h2 id="sightings-list-header">Sightings</h2>
    <div className="sighting-list-container">
     {sightings.length > 0 ? (
        <>
            <div className="sighting-container">
                <table className= "approved-sightings-table">
                    <thead className="approved-sightings-table-header">
                        <tr>
                            <th>Date of sighting: </th>
                            <th>Species: </th>
                            <th>Location: </th>
                            <th>Latitude: </th>
                            <th>Longitude: </th>
                            <th>Username: </th>
                            <th>Description: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sightings.map((sightingReport: SightingReport) => 
                            <tr key={sightingReport.id}>
                                <td>{format(new Date(sightingReport.dateOfSighting), 'dd-MM-yyyy')}</td>
                                <td>{sightingReport.speciesId}</td>
                                <td>{seaData.get(sightingReport.id)}</td>
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
        <h3 className="no-results-header">No approved sightings</h3>
            )}
    </div>
        </>
        );
    }

