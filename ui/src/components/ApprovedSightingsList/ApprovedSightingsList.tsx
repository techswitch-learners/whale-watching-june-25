import {useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
import { fetchSightings, SightingReport, fetchSeaLocation } from "../../api/ApiClient";
import {format} from 'date-fns';


export function ApprovedSightingsList() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);
    const [seaData, setSeaData] = useState<Map<number, string>>(new Map());
    const [ sightingImage, setsightingImage ] = useState<string>();
    const [ showSightingImage, setShowSightingImage ] = useState(false);

    useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
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

    function handleClickShowImage(imageUrl: string) {
        setsightingImage(imageUrl);
        setShowSightingImage(true);
    }

    function handleClickHideImage(){
        setShowSightingImage(false);
    }
    
    return (
     <>
    <div className="sighting-list-container">
     {sightings.length > 0 ? (
        <>
            <div className="sighting-container">
                <table className= "approved-sightings-table">
                    <thead className="approved-sightings-table-header">
                        <tr>
                            <th>Date: </th>
                            <th>Species: </th>
                            <th>Location: </th>
                            <th className="hide-on-mobile">Latitude: </th>
                            <th className="hide-on-mobile">Longitude: </th>
                            <th>Username:  </th>
                            <th className="hide-on-mobile">Description: </th>
                            <th className="hide-on-mobile">Photo: </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sightings.map((sightingReport: SightingReport) => 
                            <tr key={sightingReport.id}>
                                <td>{format(new Date(sightingReport.dateOfSighting), 'dd-MM-yyyy')}</td>
                                <td>{sightingReport.species}</td>
                                <td>{seaData.get(sightingReport.id)}</td>
                                <td className="hide-on-mobile">{sightingReport.latitude}</td>
                                <td className="hide-on-mobile">{sightingReport.longitude}</td>
                                <td>{sightingReport.userName}</td>
                                <td className="hide-on-mobile">{sightingReport.description}</td>
                                <td className="hide-on-mobile">{sightingReport.imageUrl != null ? <button className="view-photo-button" onClick={() => handleClickShowImage(sightingReport.imageUrl)}>View</button> : <p>No photo available</p>}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {showSightingImage && <div className="sighting-report-photo-container"> 
                <div className="sighting-report-photo-wrapper">
                <img className="sighting-report-photo" src={sightingImage}/>
                <button className="sighting-report-photo-exit-button" onClick={() => handleClickHideImage()}>X</button>
                </div>
            </div>}
            </> 
        ) : (
        <h3 className="no-results-header">No approved sightings</h3>
            )}
    </div>
        </>
        );
    }

