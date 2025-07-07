import {ApprovedSightingsList} from "../../components/ApprovedSightingsList/ApprovedSightingsList";
import { Statistics } from "../../components/Statistics/Statistics";

const HomePage = () => {
    
    return (
        <div>
            <h1 className="title">Home Page</h1>
             <Statistics />
            <ApprovedSightingsList />
        </div>
        );
}
export default HomePage;
