const BASE_URL = 'http://localhost:5000/places';

export default {
  getDbPlaces: () => {
    fetchRequest(BASE_URL)
  },
}




//Generic fetch request for use with different endpoints
const fetchRequest = (url, optionsObj) => {
  return fetch(`${BASE_URL}/${url}`, optionsObj)
    .then(res => res.status <= 400 ? res : Promise.reject(res))
    .then(result => result.json())
    .catch((err) => {
      console.log(`${err.message} while fetching /${url}`)
    });
}