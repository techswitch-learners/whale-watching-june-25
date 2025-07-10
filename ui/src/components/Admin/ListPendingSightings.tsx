import React, {useState, useEffect } from "react";
import "./ListPendingSightings.scss";
import { Species, fetchSightings, SightingReport, fetchSeaLocation, deleteWhaleSighting, approveWhaleSighting, fetchSpecies, editWhaleSpecies } from "../../api/ApiClient";
import {format} from 'date-fns';
import {PencilSquare} from 'react-bootstrap-icons';

export function ListPendingSightings() {

    const [sightings, setSightings] = useState<SightingReport[]>([]);
    const [seaData, setSeaData] = useState<Map<number, string>>(new Map());
    const [ sightingImage, setsightingImage ] = useState<string>();
    const [ showSightingImage, setShowSightingImage ] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);    
    const [isEditing, setIsEditing] = useState<boolean>();
    const [editingRowId, setEditingRowId] = useState<number>();
    const [originalValues, setOriginalValues] = useState<{ [key: number]: string }>({});
    const [editedValues, setEditedValues] = useState<{ [key: string]: string }>({});

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
            .sort((a, b) => new Date(b.dateOfSighting).getTime() - new Date(a.dateOfSighting).getTime());
        setSightings(pendingSightings);
    }

    function handleClickShowImage(imageUrl: string) {
        setsightingImage(imageUrl);
        setShowSightingImage(true);
    }

    function handleClickHideImage(){
        setShowSightingImage(false);
    }

    const handleEdit = (rowId: number, currentSpecies: string) => {
        setEditingRowId(rowId);  
        setOriginalValues((prev) => ({
        ...prev,
        [rowId]: currentSpecies,
        }));
//         setEditedValues((prev) => ({
//         ...prev,
//         [rowId]: currentSpecies,
//         }));
    };

    const handleSave = async(rowId: number) => {
        console.log("Inside save");  
        const updatedSpecies = editedValues[rowId] ;
        console.log(updatedSpecies);
        await editWhaleSpecies(updatedSpecies, rowId);                  
        setSightings(prev =>
            prev.map(report =>
            report.id === rowId
             ? { ...report, species: editedValues[rowId] }
            : report
                ));
        setEditedValues((prev) => ({
        ...prev,
        [rowId]: updatedSpecies,
        }));
        console.log(`Saving ${rowId}: ${updatedSpecies}`);       
        setIsEditing(false);        
        };


    const handleCancel = (rowId: number) => {
        setEditedValues((prev) => {    
        const updated = { ...prev };
        delete updated[rowId];
        return updated;
        });
        setEditingRowId(0);
     };

    useEffect(() => {
        fetchSpecies()
        .then((response) => {
        setSelectedSpecies(response);
         })
      .catch((err) => console.error(err));
    }, [isEditing]);

    
useEffect(() => {  
  console.log("Original Values:", originalValues);
  console.log("Edited Values:", editedValues);
}, [editedValues, originalValues]);

    
    return (
     <>
     <h2 className="list-header">Pending Sightings</h2>
    <div className="pending-list-container">
     {sightings.length > 0 ? (
        <>
            <div className="sighting-container">
                <table className= "pending-sightings-table">
                    <thead className="pending-sightings-table-header">
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
                        <React.Fragment key={sightingReport.id}>
                            <>
                                <tr key={sightingReport.id}>
                                    <td>{format(new Date(sightingReport.dateOfSighting), 'dd-MM-yyyy')}</td>
                                    
                                    <td onClick={() => {console.log(sightingReport.species);
                                        handleEdit(sightingReport.id, sightingReport.species );
                                                        setIsEditing(true);
                                                        ;}}>
                                         {editingRowId === sightingReport.id && isEditing ? (
                                             <>
                                                <select                                                     
                                                    value={editedValues[sightingReport.id] || sightingReport.species}
                                                    onChange={(e) =>                                                        
                                                        setEditedValues((prev) => ({
                                                               ...prev,
                                                      [sightingReport.id]: e.target.value,
                                                             }))
                                                        }                                           
                                                    autoFocus
                                                >
                                                    {selectedSpecies.map((opt) => (
                                                        <option key={opt.id} value={opt.species}>
                                                            {opt.species}
                                                        </option>
                                                    ))}
                                                </select>                                                
                                                <button onClick={(e) => {e.stopPropagation(); handleSave(sightingReport.id)}}>Save</button>
                                                <button onClick={(e) => {e.stopPropagation(); handleCancel(sightingReport.id)}}>Cancel</button></>   
                                                   ) : (
                                                <>
                                             {sightingReport.species}<PencilSquare size={20}/>
                                        </>
                                         )}
                                    </td>
                                    <td>{seaData.get(sightingReport.id)}</td>
                                    <td className="hide-on-mobile">{sightingReport.latitude}</td>
                                    <td className="hide-on-mobile">{sightingReport.longitude}</td>
                                    <td>{sightingReport.userName}</td>
                                    <td className="hide-on-mobile">{sightingReport.description}</td>
                                    <td className="hide-on-mobile">{sightingReport.imageUrl != null ? <button className="view-photo-button" onClick={() => handleClickShowImage(sightingReport.imageUrl)}>View</button> : <p>No photo available</p>}</td>
                                </tr>
                                <tr>
                                    <td className="accept-delete-button hide-on-mobile" colSpan={4} >
                                        <button
                                            className="delete-sighting-btn"
                                            onClick={() => handleDeleteSubmit(sightingReport.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className="accept-delete-button-mobile show-on-mobile" colSpan={2} >
                                        <button
                                            className="delete-sighting-btn-mobile"
                                            onClick={() => handleDeleteSubmit(sightingReport.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                    <td className="accept-delete-button hide-on-mobile" colSpan={4} >
                                        <button
                                            className="accept-sighting-btn"
                                            onClick={() => handleAcceptSubmit(sightingReport.id)}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                    <td className="accept-delete-button-mobile show-on-mobile" colSpan={2} >
                                        <button
                                            className="accept-sighting-btn-mobile"
                                            onClick={() => handleDeleteSubmit(sightingReport.id)}
                                        >
                                            Accept
                                        </button>
                                    </td>
                                </tr>
                            </>
                        </React.Fragment>
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
        <h3 className="list-header">No pending sightings</h3>
            )}
    </div>
        </>
        );
}
