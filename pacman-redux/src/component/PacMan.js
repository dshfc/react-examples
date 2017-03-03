import React, {Component} from 'react';

export default class Ghost extends Component {
  render() {
    return (
      <circle key="pacman" cx={this.props.x + 0.5} cy={this.props.y + 0.5} r={0.5} fill="yellow"/>
    );
  }
}
