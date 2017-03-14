import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import Message from '../Message';
import { apiUrl } from '../Utils'

class Calculate extends Component {

  constructor() {
    super()
    this.state = {length: 4, width: 5, height: 7}
    this.handleChange = this.handleChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()
    const path = `/math/volume/${this.state.length}/${this.state.width}/${this.state.height}`
    const method = "PATCH"
    fetch(path, { method } )
      .then(r => {
        if(r.ok) return r.text()
        let message =`An error has occurred with GET to ${apiUrl(r.url)}`
        const error = new Error(message)
        error.response = r
        throw error
      })
      .then(answer => this.setState({answer, error: null}))
      .catch(error => this.setState({answer: null, error}))
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    return (
      <Row id="volume">
        <Col md={12}>
          <div className="col-xs-10 col-xs-offset-2">
            <h3>Volume (Path Variables)</h3>
          </div>
          <form onSubmit={this.onSubmit} className="form-horizontal">
            <FormGroup controlId="length">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Length</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  defaultValue={this.state.length}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup controlId="width">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">Width</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  defaultValue={this.state.width}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup controlId="height">
              <ControlLabel bsClass="control-label col-sm-2 col-xs-2">height</ControlLabel>
              <div className="col-sm-10 col-xs-10">
                <FormControl
                  componentClass="input"
                  type="number"
                  defaultValue={this.state.height}
                  onChange={this.handleChange}
                />
              </div>
            </FormGroup>
            <FormGroup>
              <div className="col-xs-10 col-xs-offset-2">
                <Button type="submit">Get Volume</Button>
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
