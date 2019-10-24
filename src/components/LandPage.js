import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

export function LandPage () {
  return (
    <div className="LandPageContainer">
      {/* <div className="LandPage"> */}
        <h1 className="Headline">Shades of Green</h1>
        <img className="App-logo" src={process.env.PUBLIC_URL + 'icon-128.png'} alt="logo" />
        <br/>
        <Link to="/" className="CheckItButton">
          <Button variant="outlined">Check it out!</Button>
        </Link>
      {/* </div> */}
    </div>
  )
}
