import React, { PropTypes } from 'react'
import App from './App';
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from './configureStore'
import './index.css';
import initialState from './InitialState'

const Root = ({store}) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};

const store = configureStore(initialState);

render(<Root store={store} />,
  document.getElementById('root')
);
