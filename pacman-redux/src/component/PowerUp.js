import React, {Component} from 'react';

export default class PowerUp extends Component {

  get radius() {
    return Math.abs((this.props.time / 5 % 4) - 2) + 1;
  }

  render() {
    return (
      <g>
        <rect x={this.props.x} y={this.props.y} width="10" height="10" fill="#000000"/>
        <circle cx={this.props.x + 5} cy={this.props.y + 5} r={this.radius} fill="white"/>
      </g>
    );
  }
}
