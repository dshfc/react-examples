import React, {Component} from 'react';

export default class Floor extends Component {
  render() {
    return (
      <rect x={this.props.x} y={this.props.y} width="10" height="10" fill="#000000"/>
    );
  }
}
