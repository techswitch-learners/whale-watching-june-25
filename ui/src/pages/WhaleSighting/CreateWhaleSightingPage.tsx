import { JSX, useContext} from "react";
import { Page } from "../Page/Page";
import { CreateWhaleSightingForm } from "../../components/formComponents/WhaleSighting/CreateWhaleSightingForm";
import { LoginContext } from "../../components/Login/LoginManager/LoginContext";
import './CreateWhaleSightingPage.scss';

export function CreateWhaleSightingPage(): JSX.Element {
  const loginContext = useContext(LoginContext);
  if (loginContext.isLoggedIn){  return (
    
    <Page>
      <div  className="create-whale-sighting-page">
        <CreateWhaleSightingForm />
      </div>
    </Page>
  );
} else {
  return (
    <Page>
      <p className="login-prompt"><a href="/login" className="link-style">Log in</a> to report a sighting</p>
    </Page>
  );
}
}