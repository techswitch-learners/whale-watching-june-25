import { JSX, useContext} from "react";
import { Page } from "../Page/Page";
import { CreateWhaleSightingForm } from "../../components/formComponents/WhaleSighting/CreateWhaleSightingForm";
import { LoginContext } from "../../components/Login/LoginManager/LoginContext";


export function CreateWhaleSightingPage(): JSX.Element {
  const loginContext = useContext(LoginContext);
  if (loginContext.isLoggedIn){  return (
    
    <Page containerClassName="create-whale-sighting-page">
      <h1 className="title">Submit Whale Sighting</h1>
      <CreateWhaleSightingForm />
    </Page>
  );
} else {
  return (
    <Page>
      <h2><a href="/login">Log in</a> to report a sighting</h2>
    </Page>
  );
}
}