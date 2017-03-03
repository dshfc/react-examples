import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Message from '../Message';

class Calculate extends Component {

  constructor() {
    super()
    this.state = {type: 'rectangle', width: 4, height: 10, radius: 7}
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const path = `/area`
    const method = "POST"
    let bodyParts = []
    bodyParts.push(`type=${this.state.type}`)
    if (this.state.type === 'rectangle') {
      bodyParts.push(`width=${this.state.width}`)
      bodyParts.push(`height=${this.state.height}`)
    } else {
      bodyParts.push(`radius=${this.state.radius}`)
    }
    const body = bodyParts.join('&')

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");

    fetch(path, { method, body, headers})
      .then(r => {
        if(r.ok) return r.text()
        let message = `An error has occurred with ${method} to ${r.url} with ${body}`
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
      <Row id="area">
        <Col md={12}>
          <div className="col-xs-10 col-xs-offset-2">
            <h3>Area (Form data)</h3>
          </div>
          <form onSubmit={this.onSubmit} className="form-horizontal">
            <FormGroup controlId="type">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Type of Shape</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl componentClass="select" onChange={this.handleChange}>
                  <option value="rectangle">Rectangle</option>
                  <option value="circle">Circle</option>
                </FormControl>
              </div>
            </FormGroup>
            <FormGroup controlId="width">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Width</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  disabled={this.state.type === 'circle'}
                  defaultValue={this.state.width}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup controlId="height">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Height</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  disabled={this.state.type === 'circle'}
                  defaultValue={this.state.height}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup controlId="radius">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Radius</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  disabled={this.state.type === 'rectangle'}
                  defaultValue={this.state.radius}
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
