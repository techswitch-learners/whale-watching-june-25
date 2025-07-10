import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "../WhaleSighting/CreateWhaleSightingForm.scss";
import {
  Species,
  createWhaleSighting,
  fetchSpecies,
} from "../../../api/ApiClient.ts";
import CloudinaryUploadWidget from "../../../components/Widgets/CloudinaryUploadWidget";
import {CheckCircle} from 'react-bootstrap-icons';
import { uwConfig, useCloudinaryUpload } from "../../Widgets/CloudinaryConfig.ts";
import { LocationMarker } from "../../LocationMarker/LocationMarker.tsx";
import { MapContainer, TileLayer } from 'react-leaflet'
import { latLng, LatLng } from 'leaflet'
import "leaflet/dist/leaflet.css";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";  

export function CreateWhaleSightingForm(): JSX.Element {
  const [url, setUrl] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      latitude: 0,
      longitude: 0,
      description: "",
      whaleSpeciesId: 0,
      imageUrl: "", 
    },
  });
  const [status, setStatus] = useState<FormStatus>("READY");
  const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);
  const { imageUploaded, setPublicId, setImageUploaded } = useCloudinaryUpload();
  const [position, setPosition] = useState<LatLng>(latLng(51.553124, -0.142594));
  

  const formErrors = {
    date: {
      required: "Date is required",
      validate: "Date cannot be in the future"
    },
    latitude: {
      required: "Latitude is required",
      pattern: {
        value: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/,
        message: "Latitude should be in decimal degree format",
      },
    },
    longitude: {
      required: "Longitude is required",
      pattern: {
        value: /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)/,
        message: "Longitude should be in decimal degree format",
      },
    },
    whaleSpeciesId: {
      required: "Species is required",
    },
  };

  useEffect(() => {
    fetchSpecies()
      .then((response) => {
        setSelectedSpecies(response.sort((a: Species, b: Species) => a.species.localeCompare(b.species)));
      })
      .catch((err) => console.error(err));
  }, []);

  function submitForm(data: {
    date: string;
    latitude: number;
    longitude: number;
    description: string;
    whaleSpeciesId: number;
  }) {
    const sightingData = {
      ...data,
      imageUrl: url,
      date: new Date(data.date).toISOString().split('T')[0],
    };
    createWhaleSighting(sightingData)
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
    }

  if (status === "FINISHED") {
    return (
      <div className="sighting-report-sucess-container">
        <h2 className="report-sighting-header">Report Sighting</h2>
        <p>Your whale sighting has been submitted and is pending approval!</p>
      </div>
    );
  }
  return (
    <>
      <div className="report-sighting-form-container">
        <h2 className="report-sighting-header">Report Sighting</h2>
        
        <form
          className="create-whale-sighting-form"
          onSubmit={handleSubmit(submitForm)}>
          <div>
            <label className="form-label">
              <span className="label-text">
                Date
                <span className="required">*</span>
              </span>
              <input
                className="form-input"
                id="date"
                type="date"
                {...register("date", {
                  required: formErrors.date.required,
                  validate: (value) => {
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);

                    const selected = new Date(value);
                    selected.setHours(0, 0, 0, 0);

                    return selected <= today || formErrors.date.validate;
                  },
                })}
              />
              {errors.date && (
                <span className="error">{errors.date.message}</span>
              )}
            </label>
          </div>
          <div>
            <label className="form-label">
              <span className="label-text">
                Latitude
                <span className="required">*</span>
              </span>
              <input readOnly
                className="form-input"
                id="latitude"
                type="number"
                {...register("latitude", formErrors.latitude)}
              />
              {errors.latitude && (
                <span className="error">{errors.latitude.message}</span>
              )}
            </label>
            <label className="form-label">
              <span className="label-text">
                Longitude
                <span className="required">*</span>
                
              </span>
              
              <input readOnly
                className="form-input"
                id="longitude"
                type="number"
                {...register("longitude", formErrors.longitude)}
              />
              {errors.longitude && (
                <span className="error">{errors.longitude.message}</span>
              )}
            </label>
          </div>
          
          <div className="map-container">
            <MapContainer
              center={{ lat: 51.553124, lng: -0.142594 }}
              maxBounds={[[-90,-180],[90,180]]}
              maxBoundsViscosity={1.0}
              minZoom={1}
              zoom={1}
              scrollWheelZoom={true}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={position} setPosition={setPosition} setValue={setValue}/>
            </MapContainer>
          </div>
          <div>
            <label className="form-label">
              Description
              <input
                className="form-input"
                id="description"
                {...register("description")}
              />
            </label>
          </div>

          <div>
            <label className="form-label">
              <span className="label-text">
                Species
                <span className="required">*</span>
              </span>
              
              <select
                className="form-input-select-species"
                {...register("whaleSpeciesId", formErrors.whaleSpeciesId)}>
                <option value="">Select</option>
                {selectedSpecies.map((species) => (
                  <option key={species.id} value={species.id}>
                    {species.species}
                  </option>
                ))}
                
                
              </select>
              
              {errors.whaleSpeciesId && (
                <span className="error">{errors.whaleSpeciesId.message}</span>
              )}
            </label>
          </div>
              {imageUploaded ? (
          <div className="image-upload-sucessful-container">
            <CheckCircle size={36} />
            <p>Photo uploaded successfully</p>
          </div>
        ) : (
          <CloudinaryUploadWidget 
            uwConfig={uwConfig}
            setPublicId={setPublicId}
            setUrl={setUrl}
            setImageUploaded={setImageUploaded}
          />
        )}
          <button
            className="report-sighting-button"
            disabled={status === "SUBMITTING"}
            type="submit">
            Submit
          </button>
          {status === "ERROR" && <p>Something went wrong! Please try again.</p>}
        </form>
      </div>      
      </>

  );
}