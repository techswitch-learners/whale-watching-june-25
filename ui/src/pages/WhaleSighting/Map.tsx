
import { JSX } from "react";
import { Page } from "../Page/Page";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "./Maps.scss";
// import "leaflet/dist/leaflet.css"; 

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

export function Map(): JSX.Element {
  return (
     <Page containerClassName="map">
      {/* <div id="map" style={{ height: "100vh", width: "100%" }}> */}
   <MapContainer
      center={[0, 0]} // Center of the world (latitude, longitude)
      zoom={2} // Zoom level for a world view
      style={{ height: '100vh', width: '100%' }} // Fullscreen map
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
    </MapContainer>
    {/* </div> */}
    </Page>
  );
};


