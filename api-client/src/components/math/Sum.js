import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Message from '../Message';

class Calculate extends Component {

  constructor() {
    super()
    this.state = {numbers : [1,2,3]}
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const path = `/math/sum?n=${this.state.numbers.join('&n=')}`
    fetch(path, { method: "POST" } )
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

  handleChange(e) {
    this.setState({
      numbers: e.target.value.split("\n").map(n => n.trim()).filter(n => n)
    })
  }

  render() {
    return (
      <Row id="sum">
        <Col md={10} mdOffset={2}>
          <h3>Sum (Querystrings)</h3>
          <form onSubmit={this.onSubmit}>
            <FormGroup controlId="numbers">
              <ControlLabel>Numbers (1 per line)</ControlLabel>
              <div>
                <FormControl
                  componentClass="textarea"
                  type="number"
                  rows={5}
                  defaultValue={this.state.numbers.join('\n')}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Button type="submit">Sum</Button>
            </FormGroup>
          </form>
          <Message error={this.state.error} answer={this.state.answer} />
        </Col>
      </Row>
    )
  }

}

export default Calculate;
