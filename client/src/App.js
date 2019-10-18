import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import './App.css';
import Dashboard from './containers/Dashboard';
import Place from './containers/Place-details';
import { LandPage } from './components/LandPage';



function App () { 
  console.log(process.env);
   
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Dashboard} /> 
        <Route path="/place/:id" component={Place} /*render={(props) => <Place {...props} places={places}/>}*/ />
        <Route path="/welcome" component={LandPage} />
      </div>
    </Router>
  )
}

export default App;


