import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Pi from './Pi';
import Calculate from './Calculate';
import Sum from './Sum';
import Volume from './Volume';
import Area from './Area';

function Math() {

  return (
      <div className="container">
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroupItem href="#pi">PI (Basic Request)</ListGroupItem>
              <ListGroupItem href="#calculate">Calculate (Querystring)</ListGroupItem>
              <ListGroupItem href="#sum">Sum (Querystring)</ListGroupItem>
              <ListGroupItem href="#volume">Volume (Path Variables)</ListGroupItem>
              <ListGroupItem href="#area">Area (Form Variables)</ListGroupItem>
            </ListGroup>
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
  )

}

export default Math;
