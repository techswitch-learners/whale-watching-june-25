import { JSX, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateWhaleSighting.scss";
import {
  Species,
  createWhaleSighting,
  fetchSpecies,
} from "../../api/ApiClient";
import { Page } from "../Page/Page";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function CreateWhaleSightingForm(): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      date: new Date(),
      location: { latitude: 0, longitude: 0 },
      description: "",
      species: "",
    },
  });

  const [status, setStatus] = useState<FormStatus>("READY");
  const [selectedSpecies, setSelectedSpecies] = useState<Species[]>([]);

  const formErrors = {
    date: {
      required: "Date is required",
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
      .then((response) => setSelectedSpecies(response.items))
      .catch((err) => console.error(err));
  }, []);

  function submitForm(data: {
    date: Date;
    location: { latitude: number; longitude: number };
    description: string;
    species: string;
  }) {
    const sightingData = {
      ...data,
      date: data.date,
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
            type="date"
            {...register("date", formErrors.date)}
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
            type="number"
            {...register("location.latitude", formErrors.latitude)}
          />
          {errors.location?.latitude && (
            <span className="error">{errors.location.latitude.message}</span>
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
            type="number"
            {...register("location.longitude", formErrors.longitude)}
          />
          {errors.location?.longitude && (
            <span className="error">{errors.location.longitude.message}</span>
          )}
        </label>
      </div>

      <div>
        <label className="form-label">
          Description
          <input className="form-input" {...register("description")} />
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
            {...register("species", formErrors.species)}
          >
            <option value="">Select</option>
            <option value="1">Humpback Whale</option>
            <option value="2">Blue Whale</option>
            {selectedSpecies.map((species) => (
              <option value={species.id}>{species.species}</option>
            ))}
          </select>
          {errors.species && (
            <span className="error">{errors.species.message}</span>
          )}
        </label>
      </div>

      <button
        className="submit-button"
        disabled={status === "SUBMITTING"}
        type="submit"
      >
        Submit
      </button>
      {status === "ERROR" && <p>Something went wrong! Please try again.</p>}
    </form>
  );
}

export function CreateWhaleSighting(): JSX.Element {
  return (
    <Page containerClassName="create-whale-sighting-page">
      <h1 className="title">Submit Whale Sighting</h1>
      <CreateWhaleSightingForm />
    </Page>
  );
}
