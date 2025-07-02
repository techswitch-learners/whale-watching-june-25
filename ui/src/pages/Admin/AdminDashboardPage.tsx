import { JSX} from "react";
import { Page } from "../Page/Page";
import {ListPendingSightings  } from "../../components/Admin/ListPendingSightings";

// Dummy implementation; replace with the actual admin authentication logic
function isAdminLoggedIn(): boolean {
  // If false, admin page won't show, if true admin page will show
  return true;
}
 

export function AdminDashboardPage(): JSX.Element | null {
  if (isAdminLoggedIn() ) {
  return (
    <Page>
      <h1 className="title">Admin Dashboard</h1>
      <ListPendingSightings />
    </Page>
  );
  }
  return null
}
