import React, { useState } from 'react';
import SearchBar from '../components/Search Bar/SearchBar';
import SearchResults from '../components/Search Results/SearchResults';
import "./Home.css";

interface DogResults {
    breed: string;
    type: string;
    url: string;
}

const Home: React.FC = () => {
    const [dogResults, setDogResults] = useState<DogResults[]>([]);

    return (
        <div className='home-page'>
        <header>
        <img src="woofer.svg" className="App-logo" alt="logo" />
        <p className='woofer-title'>
          Woofer
        </p>
      </header>
      <div className='search-container'>
            <SearchBar setResults={setDogResults} />
            <SearchResults results={dogResults} />
        </div>
        </div>
      
    );
};

export default Home;
