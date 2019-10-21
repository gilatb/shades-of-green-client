const INITIAL_STATE = {
  places: [],
  votedPlaces: [],
  rating: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_PLACES':      
      return {
        ...state,
        places:
          [...action.places.results]
      }
    case 'GET_VOTED_PLACES': 
      return {
        ...state,
        votedPlaces: [
          ...state.votedPlaces, // the previous places that were there
          ...action.votedPlaces // the new places we just added 
        ]
      }
    default:
      return state;
  }
};


