import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Message from '../Message';

class Calculate extends Component {

  constructor() {
    super()
    this.state = {x:2, y:7}
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const {operation, x, y} = this.state
    const operationParam = this.state.operation ? `operation=${operation}&` : ''
    const path = `/calculate?${operationParam}x=${x}&y=${y}`
    fetch(path)
      .then(r => {
        if(r.ok) return r.text()
        let message =`An error has occurred with GET to ${r.url}`
        const error = new Error(message)
        error.response = r
        throw error
      })
      .then(answer => this.setState({answer, error: null}))
      .catch(error => { this.setState({answer: null, error}) })
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <Row id="calculate">
        <Col md={12}>
          <div className="col-xs-10 col-xs-offset-2">
            <h3>Calculate (Querystrings)</h3>
          </div>
          <form onSubmit={this.onSubmit} className="form-horizontal">
            <FormGroup controlId="operation">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Select</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl componentClass="select" onChange={this.handleChange}>
                  <option value="">Select operation</option>
                  <option value="add">Add</option>
                  <option value="subtract">Subtract</option>
                  <option value="multiply">Multiply</option>
                  <option value="divide">Divide</option>
                </FormControl>
              </div>
            </FormGroup>
            <FormGroup controlId="x">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">X</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  defaultValue={this.state.x}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup controlId="y">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Y</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  defaultValue={this.state.y}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div className="col-xs-10 col-xs-offset-2">
                <Button type="submit">Calculate</Button>
                <Message error={this.state.error} answer={this.state.answer} />
              </div>
            </FormGroup>
          </form>
        </Col>
      </Row>
    )
  }

}

export default Calculate;
