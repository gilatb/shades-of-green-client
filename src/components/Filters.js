import React from 'react';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';

import '../App.css';

export const Filters = ({ setTypeFilter }) => {

  const handleTypeChange = (event) => {
    setTypeFilter(event.target.value);
  }

  return (
    <div className="Filters">
      <div className="ByType">
        <Popup trigger={
          <Button
            variant="contained"
            color="default"
            size="small"
          >
            Filter by type
          </Button>
        } position="bottom left">
          <div>
            {['Cafe', 'Clothing', 'Supermarket', 'Hair-care', 'Vegan'].map(type => (
              <button
                key={type}
                onClick={handleTypeChange}
                value={type}
                className={"FilterButton"}
              >
                {type}
              </button>
            ))}
          </div>
        </Popup>
      </div>
    </div>
  )
}
