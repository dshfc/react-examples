import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { AutoAffix } from 'react-overlays';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Pi from './Pi';
import Calculate from './Calculate';
import Sum from './Sum';
import Volume from './Volume';
import Area from './Area';

class Math extends Component {

  constructor() {
    super()
    this.state = { answer: null }
    this.getPi = this.getPi.bind(this)
  }

  getPi(e) {
    e.preventDefault()

    fetch('/pi')
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
        <div className="container">
          <Row>
            <Col md={3}>
              <AutoAffix viewportOffsetTop={15} container={this}>
                <ListGroup>
                  <ListGroupItem href="#pi">PI (Basic Request)</ListGroupItem>
                  <ListGroupItem href="#calculate">Calculate (Querystring)</ListGroupItem>
                  <ListGroupItem href="#sum">Sum (Querystring)</ListGroupItem>
                  <ListGroupItem href="#volume">Volume (Path Variables)</ListGroupItem>
                  <ListGroupItem href="#area">Area (Form Variables)</ListGroupItem>
                </ListGroup>
              </AutoAffix>
            </Col>
            <Col md={9}>
              <Pi />
              <hr/>
              <Calculate />
              <hr/>
              <Sum />
              <hr/>
              <Volume />
              <hr/>
              <Area />
              <hr/>
            </Col>
          </Row>
        </div>
    );
  }

}

export default Math;
