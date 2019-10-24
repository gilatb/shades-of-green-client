// TODO: here will be a fetch request with this URL 
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.390205,2.154007&radius=2500&type=restaurant&keyword=vegan&key=AIzaSyAE71vQRELEoUHanJup0hhNX1Cup3_bXok
// with dinamic values 

// TODO: fix and put in the env file 
const PLACES_API = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?`
const API_KEY = process.env.API_KEY

const PLACE_TYPES = `art_gallery,bakery,beauty_salon,cafe,clothing_store,hair_care,gym,restaurant`
const GET_PLACES_URL = `${PLACES_API}key=${API_KEY}&location=${location.lat},${location.lng}&radius=2000&type=${PLACE_TYPES}`;

// should return results : [places here] and import 
function getPlaces () {
  return fetch(GET_PLACES_URL, {
    method: 'GET'
  })
    .then(res => res.json()) // parsing the result to be readable 
    .then(places => setPlaces(places)) // setting the events state to be full of the new events, and not an empty array
}


export { getPlaces }


// Example:
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=41.390205,2.154007&radius=2500&type=restaurant&keyword=vegan&key=AIzaSyAE71vQRELEoUHanJup0hhNX1Cup3_bXok
// Try:
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAE71vQRELEoUHanJup0hhNX1Cup3_bXok&location=43.390205,2.154007&radius=2000&type=art_gallery,bakery,beauty_salon,cafe,clothing_store,hair_care,gym,restaurant
// https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=AIzaSyAE71vQRELEoUHanJup0hhNX1Cup3_bXok&location=[object Object]&radius=2000&type=art_gallery,bakery,beauty_salon,cafe,clothing_store,hair_care,gym,restaurant