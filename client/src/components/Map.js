import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import { NavLink } from "react-router-dom";
import Button from '@material-ui/core/Button';


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


const MapComponent = ({ location, places = [], selectedPlace, setSelectedPlace, votedPlaces }) => {
  return (
    <GoogleMap
      defaultCenter={location}
      center={location}
      defaultZoom={12}
      zoom={14}
    >
      {places.map(place => {
        return (
          <Marker
            key={place.place_id}
            position={{
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            }}
            icon={
              paintVotedPlace(place, votedPlaces)
            }
            onClick={() => {
              setSelectedPlace(place);
            }}
          />
        )
      })}

      {selectedPlace && (
        <InfoWindow
          position={{
            lat: selectedPlace.geometry.location.lat,
            lng: selectedPlace.geometry.location.lng
          }}
          onCloseClick={() => {
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
}


export const WrappedMap = withScriptjs(withGoogleMap(MapComponent));

