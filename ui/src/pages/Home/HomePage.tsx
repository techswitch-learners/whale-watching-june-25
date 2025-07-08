import SightingsMap from "../../components/SightingsMap/SightingsMap";
import { Page } from "../Page/Page";
import { Statistics } from "../../components/Statistics/Statistics";
import { ApprovedSightingsList } from "../../components/ApprovedSightingsList/ApprovedSightingsList";

const HomePage = () => {
    return (
        <Page>
        <div>
            <h1 className="title">Home Page</h1>
            <ApprovedSightingsList />
            <SightingsMap />
            <Statistics />
        </div>
        </Page>
        );
}
export default HomePage;
