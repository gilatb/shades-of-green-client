
const PLACES_API = process.env.REACT_APP_PLACES_API_URL;
const MAPS_URL = process.env.REACT_APP_MAPS_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const GET_PLACES_URL = `${PLACES_API}key=${API_KEY}&location=${location.lat},${location.lng}&radius=2000&keyword=${typeFilter}`;


export default {
  getGooglePlaces: () => {
    fetchRequest()
  }
}

const fetchRequest = (url, optionsObj) => {
  return fetch(`${BASE_URL}/${url}`, optionsObj)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(result => result.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
}