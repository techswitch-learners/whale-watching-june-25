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


type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";  

export function CreateWhaleSightingForm(): JSX.Element {
  const [url, setUrl] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date().toISOString().split("T")[0],
      latitude: 0,
      longitude: 0,
      description: "",
      speciesId: 0,
      imageUrl: "",
      userId: 1,
    },
  });
  const [status, setStatus] = useState<FormStatus>("READY");
  const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);
  const [, setPublicId] = useState<string>('');
  const [imageUploaded, setImageUploaded] = useState<boolean>(false);

  const cloudName = 'hzxyensd5';
  const uploadPreset = 'aoh4fpwm';
  const maxImageFileSize = 10000000;
  const maxVideoFileSize = 100000000;
  const clientAllowedFormats = ["jpg","jpeg","png"];
  const multiple = false;

  const uwConfig = {
    cloudName,
    uploadPreset,
    maxImageFileSize,
    maxVideoFileSize,
    clientAllowedFormats,
    multiple
  };

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
    species: {
      required: "Species is required",
    },
  };

  useEffect(() => {
    fetchSpecies()
      .then((response) => {
        setSelectedSpecies(response.items);
      })
      .catch((err) => console.error(err));
  }, []);

  function submitForm(data: {
    date: string;
    latitude: number;
    longitude: number;
    description: string;
    speciesId: number;
  }) {
    const sightingData = {
      ...data,
      imageUrl: url,
      date: new Date(data.date).toISOString().split('T')[0],
      userId: 1,
    };
    
    createWhaleSighting(sightingData)
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
    }

  if (status === "FINISHED") {
    return (
      <div>
        <p>Your Whale Sighting Has Been Submitted And Is Pending Approval!</p>
      </div>
    );
  }
  return (
    <div>
          {imageUploaded ? (
      <div>
           <CheckCircle size={36}/>
      <p>Photo Uploaded successfully</p>
      </div>
    ) : (
      <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} setUrl={setUrl} setImageUploaded={setImageUploaded}/>
    )}

    <form
      className="create-whale-sighting-form"
      onSubmit={handleSubmit(submitForm)}
    >
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
              validate: ((value) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                const selected = new Date(value);
                selected.setHours(0, 0, 0, 0);

                return selected <= today || formErrors.date.validate
              }

              )
            })
            }
          />
          {errors.date && <span className="error">{errors.date.message}</span>}
        </label>
      </div>
      <div>
        <label className="form-label">
          <span className="label-text">
            Latitude
            <span className="required">*</span>
          </span>
          <input
            className="form-input"
            id="latitude"
            type="number"
            {...register("latitude", formErrors.latitude)}
          />
          {errors.latitude && (
            <span className="error">{errors.latitude.message}</span>
          )}
        </label>
      </div>

      <div>
        <label className="form-label">
          <span className="label-text">
            Longitude
            <span className="required">*</span>
          </span>
          <input
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
            className="form-input"
            {...register("speciesId", formErrors.species)}
          >
            <option value="">Select</option>
            {selectedSpecies.map((species) => (
              <option key={species.id} value={species.id}>
                {species.species}
              </option>
            ))}
          </select>
          {errors.speciesId && (
            <span className="error">{errors.speciesId.message}</span>
          )}
        </label>
      </div>

      <button
        className="submit-button"
        disabled={status === "SUBMITTING"}
        type="submit"
      >
        Submit
      </button >
      {status === "ERROR" && <p>Something went wrong! Please try again.</p>}
    </form>
    </div>
  );
}