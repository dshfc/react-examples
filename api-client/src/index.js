import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import App from './App';
import Math from './components/math/Math'

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Math}/>
        // <Route path="/math" component={Math}/>
      </Route>
    </Router>
  ),
  document.getElementById('root')
);
