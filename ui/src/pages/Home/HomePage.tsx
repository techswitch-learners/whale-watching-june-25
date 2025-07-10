import { Leaderboard } from "../../components/Leaderboard/Leaderboard";
import SightingsMap from "../../components/SightingsMap/SightingsMap";
import { Page } from "../Page/Page";
import { Statistics } from "../../components/Statistics/Statistics";

const HomePage = () => {
    return (
        <Page>
        <div>
            <h2 className="welcome-message-header">Join our global community of whale watchers!</h2>
            <p className="welcome-message">Whether you&rsquo;re planning your first trip or you&rsquo;re a seasoned spotter, you can use our platform to report sightings, discover different species and where to find them, and share your love of whales with fellow members of the community.</p>
            <SightingsMap />
            <Statistics />
            <Leaderboard/>
        </div>
        </Page>
        );
}
export default HomePage;