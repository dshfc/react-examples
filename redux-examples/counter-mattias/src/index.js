import React from 'react';
import Counter from './Counter';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import primaryReducer from './primary_reducer'

function mapStateToProps(state) {
  return {
    store: state,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      increment: (amount) => { dispatch({ type: 'INCREMENT_BY_VAL', amount: amount}) },
    }
  }
}

const initialState = {count: 0}
const store = createStore(primaryReducer, initialState)

const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedCounter />
  </Provider>,
  document.getElementById('root')
)