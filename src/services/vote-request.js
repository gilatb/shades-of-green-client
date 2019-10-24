// should be inside useEffect, changing for every rating 
const BASE_URL = `http://localhost:5000/places/${place_id}`; // FIXME: place_id? How to access? 

export const addVote = () => {
  fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(votedPlaces => setPlaces(votedPlaces)) // setting the events state to be full of the new events, and not an empty array
    .catch(error => console.error(error));
};