import { JSX, useContext} from "react";
import { Page } from "../Page/Page";
import {ListPendingSightings  } from "../../components/Admin/ListPendingSightings";
import { LoginContext } from "../../components/Login/LoginManager/LoginManager";


const loginContext = useContext(LoginContext);

// Dummy implementation; replace with the actual admin authentication logic
// function isAdminLoggedIn(): boolean {
//   // If false, admin page won't show, if true admin page will show
//   return true;
// }
 
// Example: Fetch admin status from an API endpoint that checks .NET Identity roles



export function AdminDashboardPage(): JSX.Element | null {
 // useAdminStatus();
  if (loginContext.isAdmin) {
  return (
    <Page containerClassName="admin-dashboard-page">
      <h1 className="title">Admin Dashboard</h1>
      <ListPendingSightings />
    </Page>
  );
  }
  return null
}
