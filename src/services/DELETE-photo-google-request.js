// here will be a fetch request with this URL 

const PHOTOS_API = `https://maps.googleapis.com/maps/api/place/photo/json?`
const MAX_WIDTH = 400;
const API_KEY = process.env.API_KEY
const GET_PHOTOS_URL = `${PHOTOS_API}maxwidth=${MAX_WIDTH}&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`;


function getPlacePhoto () {
  return fetch(GET_PHOTOS_URL, {
    method: 'GET',
    mode: 'no-cors'
  })
    .then(res => res.json())
    .catch(err => console.log(err))
}


export { getPlacePhoto, GET_PHOTOS_URL }

// one try:
// https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAr3lMd6sor9BqP-J6F0OjuIDg9Cb3rItThA6dRRiOKcZFx8ZYDQSjlAbduzK4Cw9314dBfEPvg5twC8XzFhy2yUAfaculkPoEbr-V8ihG_fUWVk6DT0-_ideILSnkXJ7BEhBLFTfqz7SwIpNWhslyauvFGhShX8rpIe2hn2Ty0_4JLw1SCjeXqA&key=AIzaSyAE71vQRELEoUHanJup0hhNX1Cup3_bXok
