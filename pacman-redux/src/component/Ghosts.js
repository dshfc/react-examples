import React, {Component} from 'react';
import Ghost from './Ghost'

export default class Ghosts extends Component {

  get ghosts() {
    const ghosts = this.props.ghosts.map((ghost, i) => {
      return <Ghost key={i} x={ghost[0]} y={ghost[1]} />;
    });
    return ghosts;
  }

  render() {
    return (
      <g>
        {this.ghosts}
      </g>
    );
  }
}