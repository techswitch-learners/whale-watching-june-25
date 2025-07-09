import { JSX, useContext} from "react";
import { Page } from "../Page/Page";
import {ListPendingSightings  } from "../../components/Admin/ListPendingSightings";
import "./AdminDashboardPage.scss"
import { LoginContext } from "../../components/Login/LoginManager/LoginContext";


export function AdminDashboardPage(): JSX.Element | null {
 const loginContext  = useContext(LoginContext);
  if (loginContext.isUserAdmin) {
  return (
    <Page>
      <h1 className="title">Admin Dashboard</h1>
      <ListPendingSightings />
    </Page>
  );
 }
  return null
}
