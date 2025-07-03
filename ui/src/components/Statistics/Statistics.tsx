import {fetchSightings, SightingReport} from '../../ApiClient';
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

    console.log(sightings[0]);
    const uniqueSpeciesCount = new Set(sightings.map(s => s.speciesId)).size;
    console.log(sightings.map(s => s.speciesId));

    const totalSightingsToDate = sightings.length;

    const sightingsPerDay = sightings.reduce((acc: Record<string, number>, sighting) => {
        const date = new Date(sighting.dateOfSighting).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;cd 
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
                <h2 className="statistics-title">Whale Watching Stats</h2>
                <img src='https://png.pngtree.com/png-clipart/20221117/ourmid/pngtree-cute-cartoon-whale-png-image_6461281.png' alt='caroon whale image'/>
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
