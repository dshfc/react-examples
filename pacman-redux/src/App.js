import React, {Component} from 'react';
import {createStore, combineReducers} from 'redux';
import map from './map';
import Ghost from './component/Ghost'
import PacMan from './component/PacMan'
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

    this.store = createStore(reducer);
    this.store.subscribe(this.stateChange);

    setInterval(() => this.store.dispatch({type: 'TICK', key: this.key}), 1000/60);
  }

  stateChange() {
    const state = this.store.getState();
    this.setState(state);
  }

  get map() {
    if(!this.state) {
      return <div/>
    }
    const cells = this.state.pacManReducer.map.map((row, rowIdx) => this.renderRow(row, rowIdx));
    const ghosts = this.state.ghostReducer.ghosts.map((ghost, i) => (<Ghost key={i} x={ghost[0]} y={ghost[1]} />));
    const pacman = (<PacMan key="pacman" x={this.state.pacManReducer.pacman.pos[0]} y={this.state.pacManReducer.pacman.pos[1]} />);
    return [
      ...cells,
      ...ghosts,
      pacman
    ];
  }

  renderRow(row, rowIdx) {
    return row.map((cell, colIdx) => this.renderCell(rowIdx, colIdx, cell));
  }

  renderCell(rowIdx, colIdx, cell) {
    const colorMap = {
      '0': '#0000FF',
      '1': '#000000',
      '2': '#FFFFAA',
      '5': '#FFFFFF'
    };
    const key = `${colIdx}-${rowIdx}`;
    const color = colorMap[cell.toString()];
    return (<rect key={key} x={colIdx} y={rowIdx} width="1" height="1" fill={color}/>);
  }

  render() {
    return (
      <svg viewBox="0 0 28 28" style={{width: "100%", height: "100%"}}>
        {this.map}
      </svg>
    );
  }
}
