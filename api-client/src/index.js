import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import Math from './components/math/Math'
import Flights from './components/flights/Flights'

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Math}/>
        <Route path="/math" component={Math}/>
        <Route path="/flights" component={Flights}/>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
