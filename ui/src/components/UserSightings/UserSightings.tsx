import React, { useState, useEffect } from 'react';
import { getUserSightings, UserSighting } from "../../api/ApiClient"
import "./UserSightings.scss";
const UserSightings:React.FC = () =>  {
    const [approvedSightings, setApprovedSightings] = useState<UserSighting[]>([]);
    const [pendingSightings, setPendingSightings] = useState<UserSighting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [ sightingImage, setsightingImage ] = useState<string>();
    const [ showSightingImage, setShowSightingImage ] = useState(false);

    useEffect(() => {
        
        const fetchSightings = async () => {
            try {
                const data = await getUserSightings();
                setApprovedSightings(data.filter(sighting =>sighting.status.toLowerCase() === 'approved'));
                setPendingSightings(data.filter(sighting =>sighting.status.toLowerCase() === 'pending'));
            } catch (e) {
                const error = e as Error;
                setError(error.message || "Failed to fetch")
            } finally {
            setLoading(false)
            }
        }
        fetchSightings();
    }, []);

    if (error) return <p> Error: {error}</p>
    if (loading) return <p> Loading sightings...</p>

    function handleClickShowImage(imageUrl: string) {
        setsightingImage(imageUrl);
        setShowSightingImage(true);
    }

    function handleClickHideImage(){
        setShowSightingImage(false);
    }

    return (
        <div className='user-sightings-board'>
            <h2 className='table-name-header'>Pending Sightings:</h2>
            {pendingSightings.length ===0 ? ( <p>There are no sightings pending approval.</p>) :(
                <table className='user-sightings-table'>
                    <thead className='table-header'>
                        <tr>
                            <th className='header-th'>Date</th>
                            <th className='hide-on-mobile header-th'>Description</th>
                            <th className='hide-on-mobile header-th'>Location (Lat, Long)</th>
                            <th className='header-th'>Species</th>
                            <th className='hide-on-small-mobile header-th'>Image</th>
                            <th className='hide-on-mobile header-th'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingSightings.map(sighting => (
                            <tr key={sighting.id}>
                                <td className='info-td'>{sighting.dateOfSighting}</td>
                                <td className='hide-on-mobile info-td'>{sighting.description ?? "N/A"}</td>
                                <td className='hide-on-mobile info-td'>{sighting.latitude}, {sighting.longitude}</td>
                                <td className='info-td'>{sighting.whaleSpecies.species}</td>
                                <td className='hide-on-small-mobile info-td'>{sighting.imageUrl ? <button className="view-user-photo-button" onClick={() => handleClickShowImage(sighting.imageUrl)}>View</button> : <p>No Image Available</p>}</td>
                                <td className='hide-on-mobile info-td'>{sighting.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <h2 className='table-name-header'> Approved Sightings:</h2>
            {approvedSightings.length ===0 ? ( <p>No approved sightings yet.</p>) :(
                <table className='user-sightings-table'>
                    <thead className='table-header'>
                        <tr>
                            <th className='header-th'>Date</th>
                            <th className='hide-on-mobile header-th'>Description</th>
                            <th className='hide-on-mobile header-th'>Location (Lat, Long)</th>
                            <th className='header-th'>Species</th>
                            <th className='hide-on-small-mobile header-th'>Image</th>
                            <th className='hide-on-mobile header-th'>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {approvedSightings.map(sighting => (
                            <tr key={sighting.id}>
                                <td className='info-td'>{sighting.dateOfSighting}</td>
                                <td className='hide-on-mobile info-td'>{sighting.description ?? "N/A"}</td>
                                <td className='hide-on-mobile info-td'>{sighting.latitude}, {sighting.longitude}</td>
                                <td className='info-td'> {sighting.whaleSpecies.species}</td>
                                <td className='hide-on-small-mobile info-td'>{sighting.imageUrl ? <button className="view-user-photo-button" onClick={() => handleClickShowImage(sighting.imageUrl)}>View</button> : <p>No Image Available</p>}</td>
                                <td className='hide-on-mobile info-td'>{sighting.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showSightingImage && <div className="user-sighting-photo-container"> 
                <div className="user-sighting-photo-wrapper">
                <img className="user-sighting-photo" src={sightingImage}/>
                <button className="user-sighting-photo-exit-button" onClick={() => handleClickHideImage()}>X</button>
                </div>
            </div>
            }
        </div>
    )
}

export default UserSightings;