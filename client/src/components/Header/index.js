import React, { Component } from 'react';
import { Navbar, Nav } from 'react-bootstrap';

export class Header extends Component {

  render() {
    
    return (
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Pharma</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="#home">Signed in as : </Nav.Link>
            <Nav.Link href="#features">Logout?</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
