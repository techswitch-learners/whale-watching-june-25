import { JSX } from "react";
import { Page } from "../Page/Page";
import { CreateWhaleSightingForm } from "../../components/formComponents/WhaleSighting/CreateWhaleSightingForm";



export function CreateWhaleSightingPage(): JSX.Element {
  if (sessionStorage.getItem("isAdmin") == "true"){
    return (
      <Page containerClassName="create-whale-sighting-page">
        <h1 className="title">Submit Whale Sighting</h1>
        <CreateWhaleSightingForm />
      </Page>
    );
  } else {
    return (<></>)
  }
}
