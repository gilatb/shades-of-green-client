import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import '../App.css';


export const SearchBar = ({ setLocation, searchedPlace, setSearchedPlace }) => {

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latlng = await getLatLng(results[0]);
    setSearchedPlace(value);
    setLocation(latlng);
  };

  return (
    <div className="SearchBar">
      <PlacesAutocomplete
        value={searchedPlace}
        onChange={setSearchedPlace}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="SearchAutoCompleteContainer">
            <input 
              className="LocationSearchInput"
              {...getInputProps({ placeholder: "Type city..." })}
            />
            <div className="SearchSuggestions">
              {loading ? <div>Loading...</div> : null}
              {suggestions.map(suggestion => {

                const style = {
                  backgroundColor: suggestion.active ? '#225A23' : '#ffffff'
                };

                return (
                  <div 
                    className="SearchAutoComplete"
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>)
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  )
}