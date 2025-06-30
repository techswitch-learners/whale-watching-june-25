import {fetchSightings} from '../../../ApiClient';
import React, { useEffect} from 'react';


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

const uniqueSpeciesCount = new Set(sightings.map(s => s.speciesId)).size;

const totalSightingsToDate = sightings.length;

const mostSightingsPerDay = new Map<string, number> ();

mostSightingsPerDay.forEach(s => {
    const date = new Date(s.DateOfSighting)
    mostSightingsPerDay.set(date, (mostSightingsPerDay.get(date) || 0) + 1)

    let busiestDay = '';
    let maxCount = 0;

    mostSightingsPerDay.forEach((count, date) => {
        if(count > maxCount) {
            maxCount = count;
            busiestDay = date;
        }
    })
    
})
