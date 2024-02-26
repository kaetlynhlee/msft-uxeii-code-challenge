import React from 'react';
import "./DogCard.css";
import { useContext } from 'react';
import { FavoritesContext } from '../../context/favorites-context';


interface Props {
    imgUrl: string;
    breedName: string;
}
type FavoritesContextType = {
    addDog: any;
};

const DogCard: React.FC<Props> = ({ imgUrl, breedName }) => {
    const { addDog } = useContext<FavoritesContextType>(FavoritesContext);
    
    return (
        <div className='card-container'>
            <a href={`http://www.google.com/search?q=${breedName}+dog+rescue`}><img className='breed-img' alt={breedName} src={imgUrl} /></a>
            <div className='info-wrapper'>
            <div className='breed-title'>
                {breedName}
            </div>
            <div onClick={() => { addDog({'url': imgUrl, 'name': breedName}) }}>ADD</div>
            </div>

        </div>
    );
};

export default DogCard;
