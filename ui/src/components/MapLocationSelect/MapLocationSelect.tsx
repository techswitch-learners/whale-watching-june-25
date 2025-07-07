import { useMapEvents, Marker, Popup } from 'react-leaflet'
import { LatLng, LeafletMouseEvent  } from 'leaflet'


type LocationMarkerProps = {
  position: LatLng | null;
  setPosition: (position: LatLng) => void;
}

export function LocationMarker( locationMarkerProps: LocationMarkerProps) {
  // const [position, setPosition] = useState<LatLng | null>(null)
  useMapEvents({
    click(e: LeafletMouseEvent) {
      alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
      locationMarkerProps.setPosition(e.latlng)
    }
  })
  

  return locationMarkerProps.position === null ? null : (
    <Marker position={locationMarkerProps.position}>
      <Popup>Is this where you saw your Whale?</Popup>
    </Marker>
  )
}




