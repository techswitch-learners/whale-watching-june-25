import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
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
           const approvedSightings = response.filter(sighting => sighting.status.toLowerCase() === 'approved')
             setDropDownList(approvedSightings.map(({species}) => species));            
          if (species != "") {
            const filteredSpeciesSightings = response.filter(sighting => sighting.species === species)
            setSightings(filteredSpeciesSightings); 
             }
          else  {
          setSightings(approvedSightings)
             }
          })}, [species]);
          
    const clampLatitude = (lat: number): number => {
      const MAX_LAT = 84;
      return Math.max(Math.min(lat, MAX_LAT), -MAX_LAT);
    };
       
    const coordinates: LatLngExpression[] = sightings.map(({latitude, longitude}) => [clampLatitude(latitude), longitude]);
    const speciesDropDown = [...new Set(dropDownList)];         
    

  function ResponsiveZoom() {
    const map = useMap();   
    const [zoom, setZoom] = useState(window.innerWidth < 768 ? 1 : 2);

    useEffect(() => {
      map.setZoom(zoom);

        const handleResize = () => {
     const newZoom = window.innerWidth < 768 ? 1 : 2;
        setZoom(newZoom); 
         };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
    }, [map, zoom]);

  return null;
  }     
  
  return (
      <div className="map-container">
        <h2 className="map-header">Sightings Map</h2>
        <span className="filter-label-text">Filter by Species</span>
        <select aria-label="Select a species" id="species-filter-dropdpwn" className="species-filter" value={species} onChange = {(event) => setSpecies(event.target.value)}>
          <option value="">Select</option>
          {speciesDropDown.map((element, index) => (
            <option key = {index} value={element}>{element}</option>
          ))}
          </select>
        <div id="map-home-page" className="map">
          <MapContainer
           center={[25, 0]} 
           zoom={window.innerWidth < 768 ? 1 : 2}
      maxBounds={[[-90,-180],[90,180]]}
      maxBoundsViscosity={1.0}
      minZoom={1}    
           >
      {coordinates.map((pos, index) => (
      <Marker key={index} position={pos}>
        <Popup className="sighting-pop-up" offset={[0, -10]}>
              <b>User:</b> {sightings[index].userName}
              <br></br>
              <b>Date:</b>{" "}
              {new Date(sightings[index].dateOfSighting).toLocaleDateString()}
              <br></br>
              <b>Description:</b> {sightings[index].description}
              <br></br>
              <b>Species:</b> {sightings[index].species}
              <br></br>
              <br></br>
              {sightings[index].imageUrl ? (
                <img
                  className="map-sighting-image"
                  src={sightings[index].imageUrl}></img>
              ) : (
                <p className="no-photo">No photo available</p>
              )}
            </Popup>
          </Marker>
        ))}


 <TileLayer
               attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            <ResponsiveZoom />  
          </MapContainer>
       </div>
     </div>
  );
};