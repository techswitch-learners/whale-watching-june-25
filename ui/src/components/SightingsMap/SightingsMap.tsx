import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./SightingsMap.scss";
import { useEffect, useState } from "react";
import { fetchSightings, SightingReport,fetchUsers} from "../../api/ApiClient";
import { List } from "react-bootstrap-icons";




export default function SightingsMap() {
 
  const [sightings, setSightings] = useState<SightingReport[]>([]);


  useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
            setSightings(approvedSightings); 
        });  
    }, []);
    
    const coordinates: LatLngExpression[] = sightings.map(({latitude, longitude}) => [latitude, longitude]);
    
 

  return (
     <div className="map">
   <MapContainer
      center={[25, 0]} 
      zoom={2}    
    >
      {coordinates.map((pos, index) => (
      <Marker key={index} position={pos}>
          <Popup className="sighting-pop-up" offset={[0,-10]}>
      <b>User:</b> {sightings[index].userName}
      <br>
      </br>
       <b>Date:</b> {new Date (sightings[index].dateOfSighting).toLocaleDateString()}
      <br>
      </br>
        <b>Description:</b> {sightings[index].description}
        <br>
      </br>
        <b>Species:</b> {sightings[index].species}
        <br></br>
        <br></br>
        {sightings[index].imageUrl ? <img className="map-sighting-image" src={sightings[index].imageUrl} ></img> : <p className="no-photo">No photo available</p>}
          </Popup>
      </Marker>
    ))}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    </div>
  );
};