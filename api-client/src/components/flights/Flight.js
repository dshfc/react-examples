import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import JsonMessage from '../JsonMessage';

class Flight extends Component {

  constructor() {
    super()
    this.state = { answer: null }
    this.getFlight = this.getFlight.bind(this)
  }

  getFlight(e) {
    e.preventDefault()

    fetch('/flights')
      .then(r => {
        if(r.ok) return r.json()
        let message =`An error has occurred with GET to ${r.url}`
        const error = new Error(message)
        error.response = r
        throw error
      })
      .then(answer => {
        this.setState({answer, error: null})
        this.validateJson(answer)
      })
      .catch(error => this.setState({error}))
  }

  validateJson(answer) {

    const Validator = require('jsonschema').Validator
    const v = new Validator()

    const flightSchema = {
      "id": "/Flight",
      "type": "object",
      "properties": {
        "tickets": {
          "type": "array",
          "items": {"$ref": "/Ticket"}
        },
      },
      "required": ["tickets"]
    }

    const ticketSchema = {
      "id": "/Ticket",
      "type": "object",
      "properties": {
        "price": {"type": "number"},
        "passenger": {"$ref": "/Person"},
      },
      "required": ["passenger", "price"]
    };

    const personSchema = {
      "id": "/Person",
      "type": "object",
      "properties": {
        "firstName": {"type": "string"},
        "lastName": {"type": "string"},
      },
      "required": ["firstName", "lastName"]
    }

    v.addSchema(ticketSchema, '/Ticket');
    v.addSchema(personSchema, '/Person');
    v.validate(answer, flightSchema, {throwError: true});
  }

  render() {
    return (
      <Row id="flight">
        <Col sm={10} smOffset={2}>
          <h3>Get a flight (Simple Endpoint)</h3>
          <p>
            <Button onClick={this.getFlight}>Get a Flight</Button>
          </p>
          <JsonMessage error={this.state.error} answer={this.state.answer} />
        </Col>
      </Row>
    );
  }

}

export default Flight;
