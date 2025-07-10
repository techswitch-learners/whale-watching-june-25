import { useMapEvents, Marker, Tooltip } from 'react-leaflet'
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
    whaleSpeciesId: number;
    imageUrl: string;
    }>;
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
      <Tooltip direction="top" offset={[-13, -20]} opacity={1} permanent>Select sighting location</Tooltip>
    </Marker>
  )
}




