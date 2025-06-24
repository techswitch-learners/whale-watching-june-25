import  { FormEvent, JSX, useState } from "react";
import { useForm } from "react-hook-form";
import "./CreateWhaleSighting.scss";
import { coordinates, createWhaleSighting } from "../../api/ApiClient";
import { Page } from "../Page/Page";

type FormStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function CreateWhaleSightingForm(): JSX.Element {
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  
  const [location, setLocation] = useState<coordinates>({latitude:0, longitude:0});  
  const [description, setDescription] = useState("");
  const [species, setSpecies] = useState("");
  const [status, setStatus] = useState<FormStatus>("READY");

  function submitForm(event: FormEvent) {
    event.preventDefault();
    setStatus("SUBMITTING");
    createWhaleSighting({ date : new Date(date), location, description, species })
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  }

  if (status === "FINISHED") {
    return (
      <div>
        <p>Whale Sighting Submitted Successfully!</p>
      </div>
    );
  }

  return (
    <form className="create-whale-sighting-form" onSubmit={submitForm}>
      <label className="form-label">
        Date:
        <input
          className="form-input"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </label>

      <label className="form-label">
        Latitude:
        <input
          className="form-input"
          type="number"
          value={location.latitude}
          onChange={(event) => setLocation({...location, latitude : parseFloat(event.target.value)})}
        />
      </label>

      <label className="form-label">
        Longitude:
        <input
          className="form-input"
          type="number"
          value={location.longitude}
          onChange={(event) => setLocation({...location, longitude : parseFloat(event.target.value)})}
        />
      </label>

      <label className="form-label">
        Description:
        <input
          className="form-input"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <label className="form-label">
        Species:
        <select
          className="form-input"
          value={species}
          onChange={(event) => setSpecies(event.target.value)}
        />
      </label>

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
            <CreateWhaleSightingForm/>
        </Page>
    );
}
