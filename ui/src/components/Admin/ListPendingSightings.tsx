import {useState, useEffect } from "react";
import "./ListPendingSightings.scss";
import { fetchSightings, SightingReport, fetchSeaLocation, deleteWhaleSighting, approveWhaleSighting } from "../../api/ApiClient";
import {format} from 'date-fns';

export function ListPendingSightings() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);
    const [seaData, setSeaData] = useState<Map<number, string>>(new Map());

    useEffect(() => {
        fetchSightings().then((response) => {
            const pendingSightings = response
                .filter(sighting => sighting.status.toLowerCase() === 'pending')
                .sort((a, b) => new Date(a.dateOfSighting).getTime() - new Date(b.dateOfSighting).getTime());
            setSightings(pendingSightings); 
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

    async function handleDeleteSubmit(id: number) {
        await deleteWhaleSighting(id);
        const response = await fetchSightings();
        const pendingSightings = response
            .filter(sighting => sighting.status.toLowerCase() === 'pending')
            .sort((a, b) => new Date(a.dateOfSighting).getTime() - new Date(b.dateOfSighting).getTime());
        setSightings(pendingSightings);
    }

    async function handleAcceptSubmit(id: number) {
        await approveWhaleSighting(id);
        const response = await fetchSightings();
        const pendingSightings = response
            .filter(sighting => sighting.status.toLowerCase() === 'pending')
            .sort((a, b) => new Date(b.dateOfSighting).getDate() - new Date(a.dateOfSighting).getDate());
        setSightings(pendingSightings);
    }
    
    return (
     <>
     <h2 id="pending-list-header">Pending Sightings</h2>
    <div className="pending-list-container">
     {sightings.length > 0 ? (
        <>
            <div className="sighting-container">
                <table className= "pending-sightings-table">
                    <thead className="pending-sightings-table-header">
                        <tr>
                            <th>Date of sighting: </th>
                            <th>Species: </th>
                            <th>Location: </th>
                            <th>Latitude: </th>
                            <th>Longitude: </th>
                            <th>Username: </th>
                            <th>Description: </th>
                            <th>Image:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sightings.map((sightingReport: SightingReport) => 
                            <>
                                <tr key={sightingReport.id}>
                                    <td>{format(new Date(sightingReport.dateOfSighting), 'dd-MM-yyyy')}</td>
                                    <td>{sightingReport.speciesId}</td>
                                    <td>{seaData.get(sightingReport.id)}</td>
                                    <td>{sightingReport.latitude}</td>
                                    <td>{sightingReport.longitude}</td>
                                    <td>{sightingReport.userId}</td>
                                    <td>{sightingReport.description}</td>
                                    <td><img src={sightingReport.imageUrl} alt="Sighting" width="500" height="auto"/></td>
                                </tr>
                                <tr>
                                    <td colSpan={6} style={{ textAlign: "center" }}>
                                        <button
                                            className="delete-sighting-btn"
                                            onClick={() => handleDeleteSubmit(sightingReport.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td colSpan={6} style={{ textAlign: "center" }}>
                                        <button
                                            className="accept-sighting-btn"
                                            onClick={() => handleAcceptSubmit(sightingReport.id)}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            </>
                        )}
                    </tbody>
                </table>
            </div>
            </> 
        ) : (
        <h3 className="no-results-header">No pending sightings</h3>
            )}
    </div>
        </>
        );
    }