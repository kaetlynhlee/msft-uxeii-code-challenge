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
      <body>
            <SearchBar setResults={setDogResults} />
            <SearchResults results={dogResults} />
        </body>
        </div>
      
    );
};

export default Home;
