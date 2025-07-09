import { Leaderboard } from "../../components/Leaderboard/Leaderboard";
import SightingsMap from "../../components/SightingsMap/SightingsMap";
import { Page } from "../Page/Page";
import { Statistics } from "../../components/Statistics/Statistics";

const HomePage = () => {
    return (
        <Page>
        <div>
            <h1 className="title">Home Page</h1>
            <SightingsMap />
            <Statistics />
            <Leaderboard/>
        </div>
        </Page>
        );
}
export default HomePage;