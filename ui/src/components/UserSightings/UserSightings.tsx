import React, { useState, JSX, useEffect } from 'react';
import { getUserSightings, UserSighting } from "../../api/ApiClient"


const UserSightings:React.FC = () =>  {
    const [approvedSightings, setApprovedSightings] = useState<UserSighting[]>([]);
    const [pendingSightings, setPendingSightings] = useState<UserSighting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        
        const fetchSightings = async () => {
            try {
                const data = await getUserSightings();
                setApprovedSightings(data.filter(sighting =>sighting.status.toLowerCase() === 'approved'));
                setPendingSightings(data.filter(sighting =>sighting.status.toLowerCase() === 'pending'));
            } catch (error: any) {
                setError(error.message || "Failed to fetch")
            } finally {
            setLoading(false)
            }
        }
        fetchSightings();
    }, []);

    if (error) return <p> Error: {error}</p>
    if (loading) return <p> Loading sightings...</p>

    return (
        <div>
            <h2>Pending Sightings:</h2>
            {pendingSightings.length ===0 ? ( <p>There are no sightings pending approval.</p>) :(
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Location (Lat, Long)</th>
                            <th>Species</th>
                            <th>Image</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingSightings.map(sighting => (
                            <tr key={sighting.id}>
                                <td>{sighting.dateOfSighting}</td>
                                <td>{sighting.description ?? "N/A"}</td>
                                <td>{sighting.latitude}, {sighting.longitude}</td>
                                <td>{sighting.whaleSpecies.species}</td>
                                <td>{sighting.imageUrl ? <img src= {sighting.imageUrl} alt= {sighting.whaleSpecies.species}/> : <p>No Image Available</p>}</td>
                                <td>{sighting.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}


            <h2> Approved Sightings:</h2>
            {approvedSightings.length ===0 ? ( <p>No approved sightings yet.</p>) :(
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Location (Lat, Long)</th>
                            <th>Species</th>
                            <th>Image</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedSightings.map(sighting => (
                            <tr key={sighting.id}>
                                <td>{sighting.dateOfSighting}</td>
                                <td>{sighting.description ?? "N/A"}</td>
                                <td>{sighting.latitude}, {sighting.longitude}</td>
                                <td>{sighting.whaleSpecies.species}</td>
                                <td>{sighting.imageUrl ? <img src= {sighting.imageUrl} alt= {sighting.whaleSpecies.species}/> : <p>No Image Available</p>}</td>
                                <td>{sighting.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default UserSightings;