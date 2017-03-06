import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import Math from './components/math/Math'
import Flights from './components/flights/Flights'
import Movies from './components/movies/Movies'

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Math}/>
        <Route path="/math" component={Math}/>
        <Route path="/flights" component={Flights}/>
        <Route path="/movies" component={Movies}/>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
