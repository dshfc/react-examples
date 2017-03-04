import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Message from '../Message';

class Pi extends Component {

  constructor() {
    super()
    this.state = { answer: null }
    this.getPi = this.getPi.bind(this)
  }

  getPi(e) {
    e.preventDefault()

    fetch('/math/pi')
      .then(r => {
        if(r.ok) return r.text()
        let message =`An error has occurred with GET to ${r.url}`
        const error = new Error(message)
        error.response = r
        throw error
      })
      .then(answer => this.setState({answer, error: null}))
      .catch(error => this.setState({answer: null, error}))
  }

  render() {
    return (
      <Row id="pi">
        <Col sm={10} smOffset={2}>
          <h3>What is Pi? (Simple Endpoint)</h3>
          <p>
            <Button onClick={this.getPi}>Find out!</Button>
          </p>
          <Message error={this.state.error} answer={this.state.answer} />
        </Col>
      </Row>
    );
  }

}

export default Pi;
