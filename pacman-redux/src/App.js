import React, {Component} from 'react';
import {createStore, combineReducers} from 'redux';
import Ghosts from './component/Ghosts'
import PacMan from './component/PacMan'
import Map from './component/Map'
import ghostReducer from './reducer/GhostReducer'
import pacManReducer from './reducer/PacManReducer'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.key = 0; // State needed to track keyboard :(
    document.body.addEventListener('keydown', (ev) => this.key = ev.keyCode.toString());

    const reducer = combineReducers({pacManReducer, ghostReducer});
    this.stateChange = this.stateChange.bind(this);

    this.state = {
      pacManReducer: pacManReducer(undefined, {type: 'none'}),
      ghostReducer: ghostReducer(undefined, {type: 'none'})
    };
    this.store = createStore(reducer, this.state);
    this.store.subscribe(this.stateChange);

    setInterval(() => this.store.dispatch({type: 'TICK', key: this.key}), 1000/60);
  }

  stateChange() {
    const state = this.store.getState();
    this.setState(state);
  }

  render() {
    return (
      <svg viewBox="0 0 28 28" style={{width: "100%", height: "100%"}}>
        <Map key="map" map={this.state.pacManReducer.map} />
        <Ghosts key="ghosts" ghosts={this.state.ghostReducer.ghosts} />
        <PacMan key="pacman" x={this.state.pacManReducer.pacman.pos[0]} y={this.state.pacManReducer.pacman.pos[1]} />
      </svg>
    );
  }
}
