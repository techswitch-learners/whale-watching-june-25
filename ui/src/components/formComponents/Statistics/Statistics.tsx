// import {fetchSightings} from "../../../can't find api client?"

export function Statistics () {

 const [sightings, setSightings] = useState<SightingReport[]>([]);


 //we could pass sightings from the approved sightings list component instead of fetching?

useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status === 'approved')
            .sort((a, b) => new Date(b.dateOfSighting).getDate() - new Date(a.dateOfSighting).getDate());
            setSightings(approvedSightings); 
        });  
    }, []);
}
