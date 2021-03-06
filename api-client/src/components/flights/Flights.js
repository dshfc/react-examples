import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import Flight from './Flight';
import FlightList from './FlightList';
import TicketTotal from './TicketTotal';

function Flights () {

  return (
      <div className="container">
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroupItem href="#flight">Single Flight</ListGroupItem>
              <ListGroupItem href="#flightlist">List of Flights</ListGroupItem>
              <ListGroupItem href="#tickettotal">Ticket Total</ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={9}>
            <Flight />
            <hr/>
            <FlightList />
            <hr/>
            <TicketTotal />
            <hr/>
          </Col>
        </Row>
      </div>
  )

}

export default Flights;
