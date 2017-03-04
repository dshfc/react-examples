import React, {Component} from 'react';

export default class Ghost extends Component {

  get radius() {
    return 5 - (this.props.dying / 100 * 5);
  }

  render() {
    return (
      <circle key="pacman" cx={this.props.x + 5} cy={this.props.y + 5} r={this.radius} fill="yellow"/>
    );
  }
}
