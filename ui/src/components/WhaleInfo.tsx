import React, { useState, JSX, useEffect } from 'react';
import species from '../assets/species.json';
import Collapsible from '../helpers/CollapsibleShowHide';
import "../page/WhaleInfo/WhaleInfoPage.scss";

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
    const [selectedSpecies, setSelectedSpecies] = useState<WhaleInfoProps>(species[0]);
    const [showPopUp, setShowPopUp] = useState<boolean>(true);

    const handleSpeciesClick = (species: WhaleInfoProps) => {
        setSelectedSpecies(species);
        setShowPopUp(true);
    };

    useEffect(() => {
        // Set the first species as the default selected species
        
    }, []);

    return (
        <div className="whale-info">
            <h1>How to find a whale</h1>
            
            <div>
                <h3>If you’ve never seen a whale before, it can be hard to know what to look for. Here are some general and specific tips that may help you see and identify specific species.</h3>
                <h2>General Tips:</h2>
                    <ul className='general-tips-list'>
                        <li> Scan from left to right, slowly, and then back again. Look close to shore, and look out across the horizon. Watch for anything that breaks the surface of the water.</li>
                        <li> Look for boats, especially if they are stopped. Sometimes the best way to find marine mammals is to find the other people who are watching them. </li>
                        <li> Don't get fooled by driftwood or logs that look like animals, floating on the surface of the water. </li>
                    </ul>
                <div className='standard-inline-image-of-whale'>
                <img src="https://www.sailorsforthesea.org/sites/default/files/Whale2.jpg" alt="general image of whale" />
            </div>
            </div>
            
            <div className="species-info">
                <h2>Tips for finding whales by Species:</h2>
                <label htmlFor="species">Choose a species: </label>
                <select
                    id="species"
                    onChange={(e) => {
                        const selected = species.find((whale) => whale.Species === e.target.value);
                        if (selected) handleSpeciesClick(selected);
                    }}
                    value={selectedSpecies ? selectedSpecies.Species : ""}
                >
                    {species.map((whale) => (
                        <option className="species" value={whale.Species} key={whale.Species}>
                            {whale.Species}
                        </option>
                    ))}
                </select>
            </div>

            {showPopUp && (
            <div className='pop-up-section'>
                <h2>Tips on how to find a {selectedSpecies.Species}</h2>
                <div className='image-of-species'>
                    <img src={selectedSpecies.img} alt={selectedSpecies.Species} />
                    <p></p>
                </div>
                <div>
                    <h3>The best time and places to find a {selectedSpecies.Species}</h3>
                                        {selectedSpecies.WhenNWhereToSee.map((place, idx) => (
                                            <div key={idx}>
                                                {place.Where} in {place.When}
                                            </div>
                                        ))}
                    
                </div>
            </div>
            )}
            
        </div>
    );
}

export default WhaleInfo;