import React, {Component} from 'react';

export default class Pellet extends Component {
  render() {
    return (
      <g>
        <rect x={this.props.x} y={this.props.y} width="10" height="10" fill="#000000"/>
        <circle cx={this.props.x + 5} cy={this.props.y + 5} r={1} fill="white"/>
      </g>
    );
  }
}
