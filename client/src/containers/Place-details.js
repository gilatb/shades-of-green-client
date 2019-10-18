import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './PlaceDetails.css';
import { Header } from '../components/Header';
import { getVotedPlaces, getRating } from '../actions'
import { StarVoting } from '../components/Voter';

const Place = ({ match, places = [], votedPlaces = [], sendVotedPlacesToRedux }) => {

  const [rating, setRating] = useState(null)
  const placeIdFromURL = match.params.id;

  const fetchPostVote = (vote) => {
    const BASE_URL = `http://localhost:5000/vote`;
    console.log({ place_google_id: placeIdFromURL, score: vote, user_id: 1 })
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ place_google_id: placeIdFromURL, score: vote, user_id: 1 }),
    })
      .then(response => response.json())
      .then(() => {
        setRating(vote)
      })
      .catch(error => console.error(error));
  };

  const place = places.length
    ? places.find(place => place.place_id === placeIdFromURL)
    : JSON.parse(localStorage.getItem('lastPlace'));
  if (!place) return null;
  localStorage.setItem('lastPlace', JSON.stringify(place))

  // geting the photo URL, no need for third fetch for the api:
  // const PHOTOS_API = `https://maps.googleapis.com/maps/api/place/photo?`
  const PHOTOS_API = process.env.REACT_APP_PHOTOS_API

  const API_KEY = `AIzaSyA-sz8s67f8uMvjPO5KX9gC7kjTTQw2GMc`;
  // const API_KEY = process.env.API_KEY
  const MAX_WIDTH = 400;
  const GET_PHOTOS_URL = place && `${PHOTOS_API}maxwidth=${MAX_WIDTH}&photoreference=${place.photos[0].photo_reference}&key=${API_KEY}`;

  const getScore = (place, votedPlaces) => {
    const match = votedPlaces.find(votedPlace => place.place_id === votedPlace.google_id)
    console.log('match: ', match);
    return match
      ? <div>
        <h3>Current score: {match.average_score.toFixed(1)}</h3>
        <p>{match.num_of_votes} people rated this place</p>
      </div>
      : null;
  }

  return (
    <div className="PlaceDetailsContainer">
      <Header />
      <Link to="/">
        <button className="BackButton">
          <span role="img" aria-label="Back">👈</span>
        </button>
      </Link>
      <h1 className="PlaceName">{place.name}</h1>
      <img className="PlaceImage"
        src={GET_PHOTOS_URL}
        alt="That cool place"
        width="300vw"
      />
      {getScore(place, votedPlaces)}
      <div className="RatingDiv"> 
      {rating
        ? (
          <div>
          <h3>Thank you for your rating! <span role="img" aria-label="Back">🙏🏼</span></h3>
          <p>You voted {rating} for this place</p>
        </div>)
        : <StarVoting
        placeId={placeIdFromURL}
        rating={rating}
        setVote={fetchPostVote}
        />
      }
      </div>
      <div className="MoreDetails">
        <h3>Address</h3>
        <p>{place.vicinity}</p>
        {place.opening_hours.open_now ? <p>Open now: Yes! <span role="img" aria-label="Happy">🤩</span></p> : <p>Open now: No! <span role="img" aria-label="Sad">🙁</span></p>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => ({
  places: state.places,
  votedPlaces: state.votedPlaces,
  rating: state.rating,
});

const mapDispatchToProps = (dispatch) => ({
  sendVotedPlacesToRedux: (votedPlaces) => dispatch(getVotedPlaces(votedPlaces)),
  setRatingToRedux: (rating) => dispatch(getRating(rating)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Place);