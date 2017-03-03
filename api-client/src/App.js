import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import { Navbar } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';
import Math from './components/math/Math';

class App extends Component {

  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">Spring Math</a>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Math />
      </div>
    );
  }

}

export default App;
