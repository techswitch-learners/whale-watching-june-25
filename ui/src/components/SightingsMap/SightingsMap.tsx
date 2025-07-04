import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./SightingsMap.scss";
import { useEffect, useState } from "react";
import { fetchSightings, SightingReport } from "../../api/ApiClient";

export default function SightingsMap() {
 
  const [sightings, setSightings] = useState<SightingReport[]>([]);
  useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
            setSightings(approvedSightings); 
        });  
    }, []);
    
    const coordinatesArray = sightings.map(({latitude, longitude}) => ({latitude, longitude}));
    const coordinates : LatLngExpression[]  = coordinatesArray.map(coordinates => [coordinates.latitude, coordinates.longitude]);
       
  return (
     <div className="map">
   <MapContainer
      center={[0, 0]} 
      zoom={2}    
    >
      {coordinates.map((pos, index) => (
      <Marker key={index} position={pos}>
        <Popup>Marker {index + 1}</Popup>
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


