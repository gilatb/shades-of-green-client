import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';

import '../App.css';
import { Header } from '../components/Header';
import { updatePlaces } from '../actions';
import  { MapComponent } from '../components/Map';
import { SearchBar } from './Search-bar-container';
import { Filters } from '../components/Filters';
import { getVotedPlaces } from '../actions'

const PLACES_API = process.env.REACT_APP_PLACES_API_URL;
const MAPS_URL = process.env.REACT_APP_MAPS_URL;
const API_KEY = process.env.REACT_APP_API_KEY;

const Dashboard = ({ places, sendPlacesToRedux, votedPlaces, sendVotedPlacesToRedux }) => {

  const currentLocation = { // this is the default location (BCN🔆 is lat: 41.390205, lng: 2.154007)
    lat: 45.390205,
    lng: 2.154007
  };

  const [location, setLocation] = useState(currentLocation);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      }, (err) => {
        console.log(err);
      });
    }
    // eslint-disable-next-line 
  }, [])

  // if a places has been searched in the search bar:
  const [searchedPlace, setSearchedPlace] = useState('');
  //if a place has been seleced, should open infoWindow
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [zoom, setZoom] = useState(12);
  // filters states 
  // const [scoreRangeFilter, setScoreRangeFilter] = useState(null);
  const [typeFilter, setTypeFilter] = useState('restaurant');
  // const [radiusFilter, setRadiusFilter] = useState(null);

  //✅ handling with the places list.
  const GET_PLACES_URL = `${PLACES_API}key=${API_KEY}&location=${location.lat},${location.lng}&radius=2000&keyword=${typeFilter}`;



  const fetchPlaces = () => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyurl + GET_PLACES_URL, {
      method: 'GET',
    })
      .then(res => res.json())
      .then((placesArr) => { sendPlacesToRedux(placesArr) })
      .catch(() => console.log("🧨 Can’t access response. Blocked by browser?"))
  }

  useEffect(fetchPlaces, [GET_PLACES_URL])

  // 🅾️ handling with the votes -> should be updated according to the rating state 
  // url of the backend:
  const BASE_URL = 'http://localhost:5000/places';

  function fetchVotedPlaces () {
    fetch(BASE_URL, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(votedPlaces => sendVotedPlacesToRedux(votedPlaces))
      .catch(err => console.log(err));
  }

  useEffect(fetchVotedPlaces, [])


  return (
    <div className="Dashboard">
      <Header />
      <SearchBar
        setLocation={setLocation}
        searchedPlace={searchedPlace}
        setSearchedPlace={setSearchedPlace}
      />
      <Filters
        setTypeFilter={setTypeFilter}
      />
      <MapComponent
        className="Map"
        location={location}
        zoom={zoom}
        setZoom={setZoom}
        setSelectedPlace={setSelectedPlace}
        selectedPlace={selectedPlace}
        places={places}
        votedPlaces={votedPlaces}
      />
    </div>
  )
}


const mapStateToProps = (state) => ({
  places: state.places,
  votedPlaces: state.votedPlaces,
});

const mapDispatchToProps = (dispatch) => ({
  sendPlacesToRedux: (places) => dispatch(updatePlaces(places)),
  sendVotedPlacesToRedux: (votedPlaces) => dispatch(getVotedPlaces(votedPlaces)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);