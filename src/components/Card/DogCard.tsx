import React from 'react';
import "./DogCard.css";

interface Props {
    imgUrl: string;
    breedName: string;
}

const DogCard: React.FC<Props> = ({ imgUrl, breedName }) => {
    return (
        <div className='card-container'>
            <img className='breed-img' alt={breedName} src={imgUrl} />
            <div className='breed-title'>
                {breedName}
            </div>
        </div>
    );
};

export default DogCard;
