export const storeFavoriteItems = (favoriteItems) => {
    const favorites = favoriteItems?.length > 0 ? favoriteItems : [];
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
  
  const favoritesReducer = (state, action) => {
    switch(action.type) {
      case 'ADD_ITEM':
        // check if item is already favorited
        if (!state.favoriteItems.find(item => item.name === action.payload.name)) {
          state.favoriteItems.push(action.payload)
        }
        return {
          ...state,
          favoriteItems: [...state.favoriteItems],
          ...storeFavoriteItems(state.favoriteItems),

        }
      case 'REMOVE_ITEM':
        const newFavoriteItems = state.favoriteItems.filter(item => item.name !== action.payload.name);
        return {
          ...state,
          favoriteItems: [...favoriteItems],
          ...storeFavoriteItems(state.favoriteItems), 
        }
      case 'CLEAR':
        localStorage.removeItem('favorites');
        return {
          favoriteItems: []
        }    
      default:
        return state;
    }
  }
  
  export default favoritesReducer;