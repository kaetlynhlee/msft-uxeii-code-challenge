import React, { createContext, useReducer } from 'react';
import favoritesReducer, {storeFavoriteItems} from './favorites-reducer';

export const FavoritesContext = createContext();

const favoritesFromStorage = localStorage.getItem('favorites') ?
    JSON.parse(localStorage.getItem('favorites')) : [];

const initialState = { favoriteItems: favoritesFromStorage, ...storeFavoriteItems(favoritesFromStorage)};

const FavoritesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(favoritesReducer, initialState);
    const addDog = (dog) => dispatch({ type: 'ADD_ITEM', payload: dog });
    const removeDog = (dog) => dispatch({ type: 'REMOVE_ITEM', payload: dog });
    const clearFavorites = () => dispatch({ type: 'CLEAR' });

    const contextValues = {
        ...state,
        addDog,
        removeDog,
        clearFavorites,
    }

    return (
        <FavoritesContext.Provider value={contextValues}>
            {
                children
            }
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider;