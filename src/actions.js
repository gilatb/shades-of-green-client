export const updatePlaces = (places) => ({
  type: 'UPDATE_PLACES',
  places
});

export const getVotedPlaces = (votedPlaces) => ({
  type: 'GET_VOTED_PLACES',
  votedPlaces
});

// 👇🏻 I'm here! call it something else but getRating
export const getRating = (rating) => ({
  type: 'GET_RATING',
  rating
});

