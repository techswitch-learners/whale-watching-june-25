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
    // const [headerMessage, setHeaderMessage] = useState("No approved sightings");
    const [headerMessage, setHeaderMessage] = useState("Sightings loading . . .");
    const [filtered, setFiltered] = useState<SightingReport[]>([])

    useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
                .sort((a, b) => new Date(b.dateOfSighting).getTime() - new Date(a.dateOfSighting).getTime());
            setSightings(approvedSightings);
            if (approvedSightings.length === 0) {
                setHeaderMessage("No approved sightings");
            }
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

    useEffect(() => {
        const filteredResults = sightings.filter(
            (sighting) =>
                sighting.species.toLowerCase().includes(speciesFilter.toLowerCase()) &&
                sighting.userName.toLowerCase().includes(userNameFilter.toLowerCase()) &&
                (!dateFilter ||
                    format(new Date(sighting.dateOfSighting), 'dd-MM-yyyy') ===
                    format(new Date(dateFilter), 'dd-MM-yyyy')) &&
                seaData.get(sighting.id)?.toLowerCase().includes(oceanFilter.toLowerCase())
        );
        setFiltered(filteredResults);
        if (filteredResults.length === 0 && sightings.length > 0) {
            setHeaderMessage("No matches")
        }
    }, [sightings, speciesFilter, userNameFilter, dateFilter, oceanFilter, seaData])

    function handleClickShowImage(imageUrl: string) {
        setsightingImage(imageUrl);
        setShowSightingImage(true);
    };

    function handleClickHideImage() {
        setShowSightingImage(false);
    }

    return (
        <>
            <div className="filter-heading hide-on-mobile">Filters</div>
            <div className="filter hide-on-mobile">

                <input
                    className="input-filter hide-on-mobile"
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                />

                <input
                    className="input-filter hide-on-mobile"
                    type="text"
                    placeholder="Species"
                    value={speciesFilter}
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                />

                <input
                    className="input-filter hide-on-mobile"
                    type="text"
                    placeholder="Location"
                    value={oceanFilter}
                    onChange={(e) => setOceanFilter(e.target.value)}
                />

                <input
                    className="input-filter hide-on-mobile"
                    type="text"
                    placeholder="User Name"
                    value={userNameFilter}
                    onChange={(e) => setUserNameFilter(e.target.value)}
                />

            </div>
            <div className="sighting-list-container">
                <h2 id="sightings-list-header"></h2>
                {sightings.length > 0 ? (
                    <>
                        <div className="sighting-container">
                            <table className="approved-sightings-table">
                                <thead className="approved-sightings-table-header">
                                    <tr>
                                        <th> Date: </th>
                                        <th> Species: </th>
                                        <th> Location:</th>
                                        <th className="hide-on-mobile">Latitude: </th>
                                        <th className="hide-on-mobile">Longitude: </th>
                                        <th> Username: </th>
                                        <th className="hide-on-mobile">Description: </th>
                                        <th className="hide-on-mobile">Photo: </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filtered.length > 0 ? (
                                        filtered.map((sightingReport: SightingReport) =>
                                            <tr key={sightingReport.id}>
                                                <td>{format(new Date(sightingReport.dateOfSighting), 'dd-MM-yyyy')}</td>
                                                <td>{sightingReport.species}</td>
                                                <td>{seaData.get(sightingReport.id)}</td>
                                                <td className="hide-on-mobile">{sightingReport.latitude}</td>
                                                <td className="hide-on-mobile">{sightingReport.longitude}</td>
                                                <td>{sightingReport.userName}</td>
                                                <td className="hide-on-mobile">{sightingReport.description}</td>
                                                <td className="hide-on-mobile">{sightingReport.imageUrl !== null && sightingReport.imageUrl !== "" ? <button className="view-photo-button" onClick={() => handleClickShowImage(sightingReport.imageUrl)}>View</button> : <p>No photo available</p>}</td>
                                            </tr>
                                        )
                                    ) : (
                                        <tr>
                                            <td className="no-results-header" colSpan={8}>{headerMessage}</td>
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
                    <h3 className="no-results-header">{headerMessage}</h3>
                )}
            </div>
        </>
    );
}

