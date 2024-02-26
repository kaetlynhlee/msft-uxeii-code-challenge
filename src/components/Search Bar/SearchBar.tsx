import React from 'react'
import { useEffect, useState, FormEvent, MouseEvent, useRef } from 'react';
import './SearchBar.css';

interface BreedOption {
    breed: string;
    type: 'parent' | 'subbreed';
    urlparam?: string;
    subbreed?: string[];
    url?: string;
}


interface Props {
    setResults: any;
}

export type SearchProps = {
    onSearch: (value: string) => void
}


const SearchBar: React.FC<Props> = ({ setResults }) => {
    const allBreedsURL = "https://dog.ceo/api/breeds/list/all";
    const randomBreedsURL = "https://dog.ceo/api/breeds/image/random/20";
    const [options, setOptions] = useState<BreedOption[]>([]);
    const [searchValue, setSearchValue] = useState<string>('');
    const [isOpen, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
        fetchRandomDogs();
        fetchOptions();
    }, []);

    const fetchRandomDogs = (): void => {
        fetch(randomBreedsURL)
            .then((response) => response.json())
            .then((json) => {
                let randomDogs: BreedOption[] = [];
                for (let randomUrl of json.message) {
                    let dogBreed = randomUrl.substring(randomUrl.indexOf("breeds/")).split('/')[1];
                    if (dogBreed.includes('-')) {
                        let parentBreedName = dogBreed.split('-')[0];
                        let subBreedName = dogBreed.split('-')[1];
                        let result: BreedOption = {
                            breed: capitalizeFirstLetter(subBreedName) + ' ' + capitalizeFirstLetter(parentBreedName),
                            type: 'subbreed',
                            url: randomUrl,
                        };
                        randomDogs.push(result);
                    } else {
                        let result: BreedOption = {
                            breed: capitalizeFirstLetter(dogBreed),
                            type: 'parent',
                            url: randomUrl,
                        };
                        randomDogs.push(result);
                    }
                }
                setResults(randomDogs);
            });
    };

    const fetchOptions = (): void => {
        fetch(allBreedsURL)
            .then((response) => response.json())
            .then((json) => {
                let breedOptionList: BreedOption[] = [];
                for (let [parent, sub] of Object.entries<string[]>(json.message)) {
                    let parentBreed: string = capitalizeFirstLetter(parent);

                    let result: BreedOption = {
                        breed: parentBreed,
                        type: 'parent',
                        urlparam: parent,
                        subbreed: sub.map((breed: string) => capitalizeFirstLetter(breed) + ' ' + parentBreed),
                    };
                    breedOptionList.push(result);

                    if (Array.isArray(sub) && sub.length > 0) {
                        for (let i = 0; i < sub.length; i++) {
                            let subBreed = capitalizeFirstLetter(sub[i]) + ' ' + parentBreed;
                            let result: BreedOption = {
                                breed: subBreed,
                                type: 'subbreed',
                                urlparam: `${parent}/${sub[i]}`,
                            };
                            breedOptionList.push(result);
                        }
                    }
                }
                setOptions(breedOptionList);
            });
    };

    const showAllBreeds = (): void => {
        fetchUrls(options);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        e.preventDefault();
        setSearchValue(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {

        if(e.key === 'Enter'){
            e.preventDefault();
            setIsOpen(false);
            findMatches();
        }
    }

    const handleInputClick = (): void => {
        setIsOpen(!isOpen);
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        setIsOpen(false);
        findMatches();
    };

    const handleOptionSelected = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsOpen(!isOpen);
        setSearchValue(e.currentTarget.value);
    };

    const handleViewAll = (e: MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setIsOpen(false);
        showAllBreeds(); 
    };
    

    const findMatches = (): void => {
        let matchesFound: BreedOption[] = [];
        const keyword = searchValue.toLowerCase().trim();
        for (let i = 0; i < options.length; i++) {
            let possibleMatch = options[i].breed;
            if (possibleMatch.toLowerCase().trim().includes(keyword)) {
                matchesFound.push(options[i]);
            }
        }
        if (matchesFound.length > 0) {
            fetchUrls(matchesFound);
        } else {
            setResults([]);
        }
    };

    async function fetchUrls(filteredResults: BreedOption[]): Promise<void> {
        await Promise.all(
            filteredResults.map(async (result) => {
                try {
                    let res = await fetch(`https://dog.ceo/api/breed/${result.urlparam}/images/random`);
                    let url = await res.json();
                    result.url = url.message;
                } catch (e) {
                    console.log(e);
                }
            })
        );
        setResults(filteredResults);
    }

    const capitalizeFirstLetter = (word: string): string => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    };

    return (
        <div className='search-bar-container'>
            <form onSubmit={handleSubmit} autoComplete="off">
                    <div className='search-input-container'>
                    <input
                        type="text"
                        id="search-bar"
                        placeholder="Dog Type"
                        name="search"
                        onClick={handleInputClick}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        value={searchValue}
                    />
                    <ul
                    className={[
                        'dropdown-container',
                        isOpen && 'show-options',
                    ]
                        .filter(Boolean)
                        .join(' ')}
                >
                    {options.map((option) => {
                        if (option.type === 'parent') {
                            return (
                                <div
                                key={option.urlparam}
                                >
                                    <button
                                        key={option.breed}
                                        onClick={handleOptionSelected}
                                        className='option parent-breed-option'
                                        value={option.breed}
                                    >
                                        {option.breed}
                                    </button>

                                    {Array.isArray(option.subbreed) &&
                                        option.subbreed.length > 0 &&
                                        option.subbreed.map((value) => {
                                            let subBreedValue = value;
                                            return (
                                                <button
                                                    key={subBreedValue}
                                                    onClick={handleOptionSelected}
                                                    className='option sub-breed-option'
                                                    value={subBreedValue}
                                                >
                                                    {subBreedValue}
                                                </button>
                                            );
                                        })}
                                </div>
                            );
                        }
                    })}
                </ul>
                    </div>
                    
                    <button className='search-btn' type="submit">Search</button>
                    <button className='view-all-btn' type="button" onClick={handleViewAll}>View All</button>
            </form>
      
        </div>
    );
};

export default SearchBar;
