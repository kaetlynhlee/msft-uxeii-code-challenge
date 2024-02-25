import React from 'react';
import DogCard from '../Card/DogCard';
import "./SearchResults.css";

interface DogResult {
    breed: string;
    type: string;
    url: string;
}

interface Props {
    results: DogResult[];
}

const SearchResults: React.FC<Props> = ({ results }) => {
    return (
        <div className='results-container'>
            {results.length ? results.map((item: DogResult, idx: number) => {
                return <DogCard key={idx} imgUrl={item.url || 'https://t3.ftcdn.net/jpg/04/34/72/82/360_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg'} breedName={item.breed} />;
            }): 
             <div>No Results Found</div>
        }
        </div>
    );
};

export default SearchResults;
