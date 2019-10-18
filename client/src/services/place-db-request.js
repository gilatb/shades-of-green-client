

const BASE_URL = 'http://localhost:5000/places';

export function getVotedPlaces () {
  fetch(BASE_URL, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(votedPlaces => setVotedPlaces(votedPlaces))
    .catch(err => console.log(err));
}
