import React, {Component} from 'react';
import {createStore} from 'redux';
import Ghosts from './component/Ghosts'
import PacMan from './component/PacMan'
import Map from './component/Map'
import initialState from './InitialState'
import ghostReducer from './reducer/GhostReducer'
import timeReducer from './reducer/TimeReducer'
import pacManReducer from './reducer/PacManReducer'
import combineReducers from './CombineReducers'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.key = 0; // State needed to track keyboard :(
    document.body.addEventListener('keydown', (ev) => this.key = ev.keyCode.toString());

    const setState = (state, action) => {
      return state || initialState;
    };
    const reducer = combineReducers(setState, pacManReducer, ghostReducer, timeReducer);
    this.stateChange = this.stateChange.bind(this);

    this.state = reducer(undefined, {type: 'none'});
    this.store = createStore(reducer, this.state);
    this.store.subscribe(this.stateChange);

    const start = new Date().getTime();
    setInterval(() => {
      if(this.state.time % 60 === 0) {
        const now = new Date().getTime();
        const delta = (now - start) / 1000;
        console.log('FPS: ', Math.round(this.state.time / delta));
      }
      return this.store.dispatch({type: 'TICK', key: this.key})
    }, 1000/60);
  }

  stateChange() {
    const state = this.store.getState();
    this.setState(state);
  }

  render() {
    return (
      <svg viewBox="0 0 280 280" style={{width: "100%", height: "100%"}}>
        <Map key="map" map={this.state.map} time={this.state.time} />
        <Ghosts key="ghosts" ghosts={this.state.ghosts} />
        <PacMan key="pacman" x={this.state.pacman.pos[0]} y={this.state.pacman.pos[1]} dying={this.state.pacman.dying} />
      </svg>
    );
  }
}
