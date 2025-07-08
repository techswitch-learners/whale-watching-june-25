import { useState, JSX } from 'react';
import species from '../../assets/species.json';
import "../../pages/WhaleInfo/WhaleInfoPage.scss";

type WhenNWhere = {
    When: string;
    Where: string;
}

export type WhaleInfoProps = {
    Species: string;
    Img: string;
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

    return (

            <div className="species-info">
                <h2 className="species-info-subtitle">Tips for finding whales by Species:</h2>
                <label id='choose-a-species-label' htmlFor="species">Choose a species: </label>
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

            {showPopUp && (
                <>
                    <div className='pop-up-section'>
                                                <div className='image-of-species-container'>
                            <img src={selectedSpecies.Img} alt={selectedSpecies.Species} />
                        </div>
                        <h2 className="species-subtitle">Tips on how to find a {selectedSpecies.Species}</h2>
                        <div>
                            <h3 className='species-info-header'>Description:</h3>
                            <div className='species-info-text'>{selectedSpecies.Description}</div>
                            <h3 className='species-info-header'>Tips to spot this species:</h3>
                            <div className='species-info-text'>{selectedSpecies.HowToFind}</div>
                            <h3 className='species-info-header'>The best time and places to find {selectedSpecies.Species}s:</h3>
                            {selectedSpecies.WhenNWhereToSee.map((place, idx) => (
                                <div className='species-info-text' key={idx}>
                                    {place.Where} ({place.When})
                                </div>
                            ))}

                        </div>
                    </div>
                </>
            )}
            
        </div>
    );
}

export default WhaleInfo;