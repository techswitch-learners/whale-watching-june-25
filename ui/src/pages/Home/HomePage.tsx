import SightingsMap from "../../components/SightingsMap/SightingsMap";
import { Page } from "../Page/Page";

const HomePage = () => {
    
    return (
        <Page containerClassName="home">
            <h1 className="title">Test Home Page</h1>
            <SightingsMap />
         </Page>
        );
}
export default HomePage;
