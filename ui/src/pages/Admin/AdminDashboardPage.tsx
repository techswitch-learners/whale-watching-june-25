import { JSX} from "react";
import { Page } from "../Page/Page";
import {ListPendingSightings  } from "../../components/Admin/ListPendingSightings";
import "./AdminDashboardPage.scss"


export function AdminDashboardPage(): JSX.Element | null {
 // useAdminStatus();
  //if (loginContext.isAdmin) {
  return (
    <Page>
      <h1 className="title">Admin Dashboard</h1>
      <ListPendingSightings />
    </Page>
  );
 // }
  return null
}
