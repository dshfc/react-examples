import React, {Component} from 'react';
import {createStore} from 'redux';
import map from './map';
import Util from './util';
import Ghost from './Ghost'
import './App.css';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rx: 10,
      ry: 10,
      width: 28,
      height: 28,
      map: map.map,
      pos: map.pacman,
      vel: [0, 0],
      ghosts: map.ghosts
    };

    this.key = 0; // State needed to track keyboard :(
    document.body.addEventListener('keydown', (ev) => this.key = ev.keyCode.toString());

    this.reducer = this.reducer.bind(this);
    this.stateChange = this.stateChange.bind(this);

    this.store = createStore(this.reducer);
    this.store.subscribe(this.stateChange);

    setInterval(() => this.store.dispatch({type: 'TICK', key: this.key}), 1000/60);
  }

  reducer(state, action) {
    if (!state) {
      state = this.state;
    }
    switch (action.type) {
      case 'TICK':
        const keyVec = {
          '37': [-1,0],
          '38': [0,-1],
          '39': [1, 0],
          '40': [0, 1],
        };
        const foc = (val, sign) => sign > 0 ? Math.floor(val) : Math.ceil(val); // floor or ceil
        const focVec = (vec, sign) => [foc(vec[0], sign[0]), foc(vec[1], sign[1])];
        const mapHit = (pos) => state.map[pos[1]][pos[0]] !== 1;
        const snap = (val, cond) => cond ? val : Math.round(val);
        const snapVec = (val, cond) => [snap(val[0], cond[0]), snap(val[1], cond[1])];

        const desiredVelocity = keyVec[action.key] || [0,0];
        const desiredPos = focVec(Util.add(state.pos, desiredVelocity), desiredVelocity);
        const newPos = mapHit(desiredPos)
          ? Util.round(state.pos)
          : Util.add(state.pos, Util.divide(desiredVelocity, 10));
        const newVel = mapHit(desiredPos)
          ? [0,0] : state.vel;
        const snapped = snapVec(newPos, desiredVelocity);
        return Object.assign({}, state, {
          pos: snapped,
          vel: newVel
        });
      default:
        return state;
    }
  };

  stateChange() {
    this.setState(this.store.getState());
  }

  get map() {
    const cells = this.state.map.map((row, rowIdx) => this.renderRow(row, rowIdx));
    const ghosts = this.state.ghosts.map((ghost) => (<Ghost x={ghost[0]} y={ghost[1]} />));
    const pacman = <circle key="pacman" cx={this.state.pos[0] + 0.5} cy={this.state.pos[1] + 0.5} r={0.5} fill="yellow"/>;
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
    const color = colorMap[cell.toString()];
    return (<rect x={colIdx} y={rowIdx} width="1" height="1" fill={color}/>);
  }

  render() {
    return (
      <svg viewBox="0 0 28 28" style={{width: "100%", height: "100%"}}>
        {this.map}
      </svg>
    );
  }
}
