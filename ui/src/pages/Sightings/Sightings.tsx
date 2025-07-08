import { ApprovedSightingsList } from "../../components/ApprovedSightingsList/ApprovedSightingsList";
import { Page } from "../Page/Page";

export const Sightings = () => {
    return (
        <Page>
        <div>
            <h1 className="title">Sightings</h1>
            <ApprovedSightingsList/>
        </div>
        </Page>
        );
};