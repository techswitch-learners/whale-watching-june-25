import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./SightingsMap.scss";
import { useEffect, useState } from "react";
import { fetchSightings, SightingReport } from "../../api/ApiClient";

export default function SightingsMap() {
 
  const [sightings, setSightings] = useState<SightingReport[]>([]);
  const [dropDownList,setDropDownList] = useState([""]);
  const [species, setSpecies] = useState("");

  
  
  useEffect(() => {
        fetchSightings().then((response) => {
           var approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
             setDropDownList(approvedSightings.map(({species}) => species));            
          if (species != "") {
            const filteredSpeciesSightings = response.filter(sighting => sighting.species === species)
            setSightings(filteredSpeciesSightings); 
             }
          else  {
          setSightings(approvedSightings)
             }
          })}, [species]);
       
    const coordinates: LatLngExpression[] = sightings.map(({latitude, longitude}) => [latitude, longitude]);
    const speciesDropDown = [...new Set(dropDownList)];
      

     return (
     <div className="map">
   <MapContainer
      center={[25, 0]} 
      zoom={2}    
    >
      {coordinates.map((pos, index) => (
      <Marker key={index} position={pos}>
        <Popup>Whale sighting {index + 1}</Popup>               
      </Marker>
    ))}

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
    <select id="species-filter-dropdpwn" className="species-filter" value={species} onChange = {(event) => setSpecies(event.target.value)}>
      <option value="" disabled>Select a species</option>
      {speciesDropDown.map((element, index) => (
              <option key = {index} value={element}>{element}</option>
            ))}
    </select>
    </div>
    
  );
};