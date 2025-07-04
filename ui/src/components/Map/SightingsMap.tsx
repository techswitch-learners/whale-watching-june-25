import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./SightingsMap.scss";
import { useEffect, useState } from "react";
import { fetchSightings, SightingReport } from "../../api/ApiClient";

export default function SightingsMap() {
  const positionArray: LatLngExpression[] = [
    [51.505, -0.09],
    [48.8566, 2.3522],
    [40.7128, -74.006],
  ];
  const [sightings, setSightings] = useState<SightingReport[]>([]);
  useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
            setSightings(approvedSightings); 
        });  
    }, []);
    
    const sightingsMap: Map<string, {latitude: number; longitude: number}> = new Map();
    sightingsMap.set("key", {"latitude": 100, "longitude": 100});
    
    //sightings.forEach((report) => sightingsMap.set([("latitude", report.latitude), ("longitude",report.longitude)])


  return (
     <div className="map">
   <MapContainer
      center={[0, 0]} // Center of the world (latitude, longitude)
      zoom={2} // Zoom level for a world view      
    >
      {positionArray.map((pos, index) => (
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


