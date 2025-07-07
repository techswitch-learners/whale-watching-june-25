import { useState, useEffect } from "react";
import "./ApprovedSightingsList.scss";
import { fetchSightings, SightingReport, fetchSeaLocation } from "../../api/ApiClient";
import { format } from 'date-fns';


export function ApprovedSightingsList() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);
    const [seaData, setSeaData] = useState<Map<number, string>>(new Map());
    const [sightingImage, setsightingImage] = useState<string>();
    const [showSightingImage, setShowSightingImage] = useState(false);
    const [speciesFilter, setSpeciesFilter] = useState("");
    const [userNameFilter, setUserNameFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");
    const [oceanFilter, setOceanFilter] = useState("");


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
            fetchSeaLocation(sighting.latitude, sighting.longitude).then(response => {
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

    function handleClickHideImage() {
        setShowSightingImage(false);
    }

    return (
        <>
            <div className="sighting-list-container">
                <h2 id="sightings-list-header">Sightings</h2>
                {sightings.length > 0 ? (
                    <>
                        <div className="sighting-container">
                            <div className="sighting-filters">
                                <input
                                    type="text"
                                    placeholder="Filter by species"
                                    value={speciesFilter}
                                    onChange={(e) => setSpeciesFilter(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Filter by User Name"
                                    value={userNameFilter}
                                    onChange={(e) => setUserNameFilter(e.target.value)}
                                />
                                <input
                                    type="date"
                                    value={dateFilter}
                                    onChange={(e) => setDateFilter(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Filter by Ocean"
                                    value={oceanFilter}
                                    onChange={(e) => setOceanFilter(e.target.value)}
                                />

                            </div>
                            <table className="approved-sightings-table">
                                <thead className="approved-sightings-table-header">
                                    <tr>
                                        <th>
                                            <input
                                                type="date"
                                                value={dateFilter}
                                                onChange={(e) => setDateFilter(e.target.value)}
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="text"
                                                placeholder="Species Filter"
                                                value={speciesFilter}
                                                onChange={(e) => setSpeciesFilter(e.target.value)}
                                            />
                                        </th>
                                        <th><input
                                            type="text"
                                            placeholder="Ocean Filter"
                                            value={oceanFilter}
                                            onChange={(e) => setOceanFilter(e.target.value)}
                                        /></th>
                                        <th className="hide-on-mobile"></th>
                                        <th className="hide-on-mobile"></th>
                                        <th><input
                                            type="text"
                                            placeholder="User Name Filter"
                                            value={userNameFilter}
                                            onChange={(e) => setUserNameFilter(e.target.value)}
                                        />  </th>
                                        <th className="hide-on-mobile"> </th>
                                        <th className="hide-on-mobile"> </th>

                                    </tr>
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
                                    {sightings.filter((sightings) => sightings.species.toLowerCase().includes(speciesFilter.toLowerCase()) &&
                                        sightings.userName.toLowerCase().includes(userNameFilter.toLowerCase()) &&
                                        (!dateFilter || format(new Date(sightings.dateOfSighting), 'dd-MM-yyyy') == format(new Date(dateFilter), "dd-MM-yyyy")) &&
                                        seaData.get(sightings.id)?.toLowerCase().includes(oceanFilter.toLowerCase())
                                    ).map((sightingReport: SightingReport) =>
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
                                <img className="sighting-report-photo" src={sightingImage} />
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

