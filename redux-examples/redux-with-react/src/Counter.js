import React, { Component } from 'react'
import { connect } from 'react-redux'

class Counter extends Component {
  render () {
    const { count, clickHandler, decrementHandler } = this.props
    return (
      <div>
        <p id='count'>{count}</p>
        <button onClick={clickHandler}>Increment</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    count: state.count
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickHandler: (event) => { dispatch({type: 'INCREMENT'}) },
    decrementHandler: (event) => { dispatch({type: 'DECREMENT'}) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
