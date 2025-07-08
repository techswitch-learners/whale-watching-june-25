import SightingsMap from "../../components/SightingsMap/SightingsMap";
import { Page } from "../Page/Page";

const HomePage = () => {
    return (
        <Page>
        <div className="home-page">
            <h1 className="title">Home Page</h1>
            <SightingsMap/>
        </div>
        </Page>
        );
}
export default HomePage;