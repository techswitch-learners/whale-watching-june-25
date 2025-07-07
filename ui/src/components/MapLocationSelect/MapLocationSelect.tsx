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
    userId: number;}>;
}

export function LocationMarker( locationMarkerProps: LocationMarkerProps) {
  useMapEvents({
    click(e: LeafletMouseEvent) {
      locationMarkerProps.setValue("latitude", e.latlng.lat);
      locationMarkerProps.setValue("longitude", e.latlng.lng);
      locationMarkerProps.setPosition(e.latlng)
    }
  })
  

  return locationMarkerProps.position === null ? null : (
    <Marker position={locationMarkerProps.position}>
      <Popup>Is this where you saw your Whale?</Popup>
    </Marker>
  )
}




