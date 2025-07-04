import {fetchSightings, SightingReport} from '../../api/ApiClient';
import React, { useEffect, useState } from 'react';
import './Statistics.scss'; 


export function Statistics () {

    const [sightings, setSightings] = useState<SightingReport[]>([]);

    //we can import the approved sightings list from the approved sightings component instead of fetching once its merged in

    useEffect(() => {
        fetchSightings().then((response) => {
            const approvedSightings = response.filter(sighting => sighting.status === 'approved')
                .sort((a, b) => new Date(b.dateOfSighting).getDate() - new Date(a.dateOfSighting).getDate());
            setSightings(approvedSightings); 
        });  
    }, []);

    console.log('Sightings full data:', sightings)
    const uniqueSpeciesCount = new Set(sightings.map(s => s.species)).size;
    console.log(sightings.map(s => s.species));
    
    const totalSightingsToDate = sightings.length;

    const sightingsPerDay = sightings.reduce((acc: Record<string, number>, sighting) => {
        const date = new Date(sighting.dateOfSighting).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});
    let busiestDay = '';
    let maxCount = 0;
    Object.entries(sightingsPerDay).forEach(([date, count]) => {
        if (count > maxCount) {
            maxCount = count;
            busiestDay = date;
        }
    });

    return (
        <div className="statistics-card">
            <div className='title-container'>
                <h2 className="statistics-title">Fun Statistics</h2>
            </div>
            <div className="statistics-bubbles">
                <div className="stat-bubble">
                    <p>
                    <span className="stat-number">{uniqueSpeciesCount}</span> unique species have been spotted by site members!
                    </p>
                </div>
                <div className="stat-bubble">
                    <p>
                    There have been <span className="stat-number">{totalSightingsToDate}</span> sightings by site members to date!
                    </p>
                </div>
                <div className="stat-bubble">
                    <p>
                    The most sightings occured on {busiestDay}, there were <span className="stat-number">{maxCount}</span>!
                    </p>
                </div>
            </div>
        </div>
    );
}
