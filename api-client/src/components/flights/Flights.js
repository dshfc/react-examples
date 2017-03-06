import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Flight from './Flight';

function Flights () {

  return (
      <div className="container">
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroupItem href="#flight">Flight (JSON Response)</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={9}>
            <Flight />
            <hr/>
          </Col>
        </Row>
      </div>
  )

}

export default Flights;
