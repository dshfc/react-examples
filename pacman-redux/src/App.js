import React, { Component } from 'react'
import { connect } from 'react-redux'
import Ghosts from './component/Ghosts'
import PacMan from './component/PacMan'
import Map from './component/Map'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props);

    this.key = 0; // State needed to track keyboard :(
    document.body.addEventListener('keydown', (ev) => this.key = ev.keyCode.toString());

    const start = new Date().getTime();
    setInterval(() => {
      if(this.props.time % 60 === 0) {
        const now = new Date().getTime();
        const delta = (now - start) / 1000;
        console.log('FPS: ', Math.round(this.props.time / delta));
      }
      return this.props.dispatch({type: 'TICK', key: this.key})
    }, 1000/60);
  }

  render() {
    return (
      <svg viewBox="0 0 280 280" style={{width: "100%", height: "100%"}}>
        <Map key="map" map={this.props.map} time={this.props.time} />
        <Ghosts key="ghosts" ghosts={this.props.ghosts} />
        <PacMan key="pacman" x={this.props.pacman.pos[0]} y={this.props.pacman.pos[1]} dying={this.props.pacman.dying} />
      </svg>
    );
  }
}

function mapStateToProps(state) {
  return {
    time: state.time,
    map: state.map,
    ghosts: state.ghosts,
    pacman: state.pacman
  }
}

export default connect(mapStateToProps)(App)