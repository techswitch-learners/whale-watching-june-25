import { useMapEvents, Marker, Popup } from 'react-leaflet'
import { LatLng, LeafletMouseEvent  } from 'leaflet'
import { UseFormSetValue } from "react-hook-form";

type LocationMarkerProps = {
  position: LatLng;
  setPosition: (position: LatLng) => void;
  setValue: UseFormSetValue<{
    date: string;
    latitude: number;
    longitude: number;
    description: string;
    speciesId: number;
    imageUrl: string;
    userId: string;}>;
}

export function LocationMarker( locationMarkerProps: LocationMarkerProps) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      locationMarkerProps.setValue("latitude", parseFloat(e.latlng.lat.toFixed(5)));
    locationMarkerProps.setValue("longitude", parseFloat(e.latlng.lng.toFixed(5)));
      locationMarkerProps.setPosition(e.latlng)
    }
  })
  

  return locationMarkerProps.position === null ? null : (
    <Marker position={locationMarkerProps.position}>
      <Popup>Is this where you saw your Whale?</Popup>
    </Marker>
  )
}




