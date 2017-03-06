import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import JsonMessage from '../JsonMessage';
import { Table, Glyphicon, FormControl } from 'react-bootstrap';

class TicketTotal extends Component {

  constructor() {
    super()
    this.state = {
      answer: null,
      flight: {
        tickets: [
          {firstName: 'Angelica', lastName: 'Schuyler', price: 350},
          {firstName: 'Alexander', lastName: 'Hamilton', price: 75},
        ]
      }
    }
    this.getTotal = this.getTotal.bind(this)
    this.addRow = this.addRow.bind(this)
  }

  getTotal(e) {
    e.preventDefault()
    const method = 'POST'
    const body = JSON.stringify(this.state.flight)

    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    fetch('/flights/tickets/total', {method, body, headers})
      .then(r => {
        if(r.ok) return r.json()
        let message =`An error has occurred with ${method} to ${r.url}`
        const error = new Error(message)
        error.response = r
        throw error
      })
      .then(answer => {
        this.setState({answer, error: null})
        this.validateJson(answer)

        const ticketTotal = this.state.flight.tickets.reduce((sum, ticket) => sum + ticket.price, 0)

        if (answer.result !== ticketTotal) {
          throw new Error(`Expected the server to return a total of ${ticketTotal} but it was ${JSON.stringify(answer)}`)
        }
      })
      .catch(error => this.setState({error}))
  }

  addRow(e) {
    const defaultNames = [
      {firstName: "Samuel", lastName: "Seabury", price: 100},
      {firstName: "Charles", lastName: "Lee", price: 100},
      {firstName: "Maria", lastName: "Reynolds", price: 100},
      {firstName: "Aaron", lastName: "Burr", price: 100},
      {firstName: "Eliza", lastName: "Hamilton", price: 100},
      {firstName: "George", lastName: "Washington", price: 100},
      {firstName: "James", lastName: "Madison", price: 100},
      {firstName: "James", lastName: "Reynolds", price: 100},
      {firstName: "Hercules", lastName: "Mulligan", price: 100},
      {firstName: "Peggy", lastName: "Schuyler", price: 100},
      {firstName: "Philip", lastName: "Hamilton", price: 100},
      {firstName: "Thomas", lastName: "Jefferson", price: 100},
      {firstName: "Philip", lastName: "Schuyler", price: 100},
      {firstName: "John", lastName: "Laurens", price: 100},
      {firstName: "George", lastName: "Eacker", price: 100},
    ]

    e.preventDefault()
    let ticket = defaultNames[this.state.flight.tickets.length - 2]
    ticket = ticket || {price: 50}
    this.state.flight.tickets.push(ticket)
    this.setState(this.state)
  }

  validateJson(answer) {
    const Validator = require('jsonschema').Validator
    const v = new Validator()

    const resultSchema = {
      "type": "object",
      "properties": {
        "result": {"type": "number"},
      },
      "required": ["result"]
    }

    v.validate(answer, resultSchema, {throwError: true})
  }

  render() {
    const rows = this.state.flight.tickets.map((ticket, index, col) => {
      let link

      if (index === col.length - 1) {
        link = (<a href onClick={this.addRow}><Glyphicon glyph="plus" /></a>)
      }

      return (
        <tr key={`ticket-${index}`}>
          <td>
            <FormControl
              componentClass="input"
              defaultValue={ticket.firstName}
              onChange={(e) => { ticket.firstName = e.target.value; this.setState(this.state) }}
            />
          </td>
          <td>
            <FormControl
              componentClass="input"
              defaultValue={ticket.lastName}
              onChange={(e) => { ticket.lastName = e.target.value; this.setState(this.state) }}
            />
          </td>
          <td>
            <FormControl
              componentClass="input"
              type="number"
              defaultValue={ticket.price}
              style={{width: "auto", display: "inline"}}
              onChange={(e) => { ticket.price = parseInt(e.target.value, 10); this.setState(this.state) }}
            />
            &nbsp;&nbsp;
            {link}
          </td>
        </tr>
      )
    })

    return (
      <Row id="tickettotal">
        <Col sm={12}>
          <h3>Sum of Ticket Prices</h3>

          <Table striped condensed responsive>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
          </Table>

          <Button type="submit" onClick={this.getTotal}>Get Total</Button>

          <JsonMessage error={this.state.error} answer={this.state.answer} />

          <div>
            <p>
              <strong>Request Payload</strong>
            </p>
            <pre><code>{JSON.stringify(this.state.flight, null, 2)}</code></pre>
          </div>
        </Col>
      </Row>
    );
  }

}

export default TicketTotal;
