import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import "./SightingsMap.scss";
import { useEffect, useState } from "react";
import { fetchSightings, SightingReport } from "../../api/ApiClient";

export default function SightingsMap() {
 
  const [sightings, setSightings] = useState<SightingReport[]>([]);
  // const [,setFilteredSightings] = useState<SightingReport[]>([]);
  const [species, setSpecies] = useState("");
  
  
  useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
            console.log(approvedSightings);
          if (species != "") {
            console.log(species);
            const filteredSpeciesSightings = response.filter(sighting => sighting.species === species)
            console.log(filteredSpeciesSightings);
            setSightings(filteredSpeciesSightings); 
         }
        else  {
          setSightings(approvedSightings)
        }
          })}, [species]);
       
    const coordinates: LatLngExpression[] = sightings.map(({latitude, longitude}) => [latitude, longitude]);
    const availableSpecies = (sightings.map(({species}) => [species]));
    const noDupes = [...new Set(availableSpecies)]
    console.log("species " + noDupes);
   

    //   useEffect(() => {
    //     fetchSightings().then((response) => {
    //         const approvedSightings = response.filter(sighting => sighting.species === species)
    //         setSightings(approvedSightings); 
    //     });  
    // }, [species]);

    

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
    {/* <select className="species-filter" onChange = {(event) => setSpecies(event.target.value)}> */}
    <select className="species-filter" onChange = {(event) => setSpecies(event.target.value)}>
      {noDupes.map((element, index) => (
              <option key = {index} value={element}>{element}</option>
            ))}
    </select>
    </div>
    
  );
};