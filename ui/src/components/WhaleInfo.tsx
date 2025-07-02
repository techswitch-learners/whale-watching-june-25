import React, { useState, JSX } from 'react';
import species from '../assets/species.json';
import Collapsible from '../helpers/CollapsibleShowHide';

type WhenNWhere = {
    When: string;
    Where: string;
}

export type WhaleInfoProps = {
    Species: string;
    img: string;
    Description: string;
    WhenNWhereToSee: WhenNWhere[];
    HowToFind: string;
}

function WhaleInfo(): JSX.Element {
    const [selectedSpecies, setSelectedSpecies] = useState<WhaleInfoProps | null>(null);

    const handleSpeciesClick = (species: WhaleInfoProps) => {
        setSelectedSpecies(species);

    };

    return (
        <div className="whale-info">
            <h2>How to find a whale</h2>
            <h3>If you’ve never seen a whale before, it can be hard to know what to look for.Here are some general and specific tips that may help you see and identify specific species.</h3>
            <h2>General Tips:</h2>
                <ul style={{listStyleType: 'none', paddingLeft: 0}}>
                    <li> Scan from left to right, slowly, and then back again. Look close to shore, and look out across the horizon. Watch for anything that breaks the surface of the water.</li>
                    <li> Look for boats, especially if they are stopped. Sometimes the best way to find marine mammals is to find the other people who are watching them. </li>
                    <li> Don't get fooled by driftwood or logs that look like animals, floating on the surface of the water. </li>
                </ul>
            
            <h2>Tips for finding whales by Species:</h2>
                 <table>
                    <thead>
                        <tr className='TableHeader'>
                            <th>Species</th>
                            <th style={{width: '500px', maxWidth: '600px',}}>Description</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {species.map((whale) => (
                        <tr>
                            <td>{whale.Species}</td>
                            <td>{whale.Description}</td>
                            <td style = {{position: 'relative', width: '200px'}}>
                        <Collapsible key={whale.Species} open={selectedSpecies?.Species === whale.Species}>
                        <div style={{ overflowY: 'auto', maxHeight:'150px'}}>
                            <p><strong>How to Find:</strong> {whale.HowToFind}</p>
                            <h5>When and Where to See:</h5>
                            <ul>
                                {whale.WhenNWhereToSee.map((location, index) => (
                                    <li key={index}>{location.Where} ({location.When})</li>
                                ))}
                            </ul>
                        </div>
                        </Collapsible>
                    </td>
                        </tr>
                ))}
                    </tbody>
            </table>
        </div>
    );
}

export default WhaleInfo;