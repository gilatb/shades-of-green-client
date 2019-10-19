import React, { useState } from 'react';
// import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';

const API_KEY = process.env.REACT_APP_API_KEY;




export const MapComponent = ({ location, places = [], selectedPlace, setSelectedPlace, votedPlaces }) => {
  
  const getSelectedInfo = (selectedPlace, votedPlaces) => {
    const match = votedPlaces.find(votedPlace => selectedPlace.place_id === votedPlace.google_id)
    return match
      ? <div>
        <p>Score: {match.average_score.toFixed(1)}</p>
        <p>{match.num_of_votes} people rated this place</p>
      </div>
      : null;
  }
  
  const paintVotedPlace = (markerPlace, votedPlaces) => {
    const match = votedPlaces && votedPlaces.find(votedPlace => markerPlace.place_id === votedPlace.google_id);
    return match
      ? process.env.PUBLIC_URL + 'favicon-32.png'  // presenting as a colorful icon
      : process.env.PUBLIC_URL + 'black-logo.png'; // presenting a black icon
  }

  const [infoOpen, setInfoOpen] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries: [].push('places'),
  })

  const markerClickHandler = (e, place) => {
    setSelectedPlace(place)
    console.log('place: ', place);
    infoOpen ? setInfoOpen(false) : setInfoOpen(true);
  }

  const renderMap = () => {
    return (
      <GoogleMap
        id="google-map"
        center={location}
        zoom={14}
        mapContainerStyle={{
          height: "73vh",
          width: "100%"
        }}
      >
        {places.map(place => {
          return (
            <Marker
              key={place.place_id}
              position={place.geometry.location}
              icon={paintVotedPlace(place, votedPlaces)}
              onClick={e => markerClickHandler(e, place)}
            />
          )
        })}

        {selectedPlace && (
          <InfoWindow
            onLoad={infoWindow => {
              console.log('infoWindow: ', infoWindow)
            }}
            // anchor={selectedPlace.geometry.location} //TODO: should be here?
            // anchor={markerMap[selectedPlace.google_id]}
            // anchor={selectedPlace.google_id}
            position={selectedPlace.geometry.location}
            onCloseClick={() => {
              setInfoOpen(false)
              setSelectedPlace(null);
            }}
          >
            <div>
              <h2>{selectedPlace.name}</h2>
              <p>{selectedPlace.vicinity}</p>
              <NavLink
                to={`/place/${selectedPlace.place_id}`}
                style={{ textDecoration: 'none' }}
                activeStyle={{ color: 'red' }} // doesn't work, probably because of material-ui Button
              >
                <Button variant="contained">Go to place</Button>
              </NavLink>
              {getSelectedInfo(selectedPlace, votedPlaces)}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )
  };

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>
  }

  return isLoaded ? renderMap() : <p>Could not load the map</p>;
}



