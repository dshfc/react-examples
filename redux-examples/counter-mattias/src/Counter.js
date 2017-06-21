import React, {Component} from 'react';

export default class Counter extends Component {
  constructor(props) {
    super(props)
    this.handler = this.handler.bind(this)
  }

  handler(amount) {
    return () => {this.props.actions.increment(amount)}
  }


  render() {
    return (
      <div className="App">
        <p id="counter">{this.props.store.count}</p>
        <button id="increment" onClick={this.handler(1)}>Increment</button>
        <button onClick={this.handler(2)}>Two</button>
      </div>
    )
  }
}