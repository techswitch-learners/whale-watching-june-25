import { JSX, useState, useEffect } from "react";
import { Page } from "../Page/Page";
import { CreateWhaleSightingForm } from "../../components/formComponents/WhaleSighting/CreateWhaleSightingForm";



export function CreateWhaleSightingPage(): JSX.Element {

  const [user, setUser] = useState(() => {
    // Read from localStorage 
    return JSON.parse(window.sessionStorage.getItem("isAdmin"));
  });

  useEffect(() => {
    // Persist to localStorage
    window.sessionStorage.setItem("isAdmin", JSON.stringify(user))
  }, [user]);

  return (
    <Page containerClassName="create-whale-sighting-page">
      <h1 className="title">Submit Whale Sighting</h1>
      <CreateWhaleSightingForm />
    </Page>
  );
}
