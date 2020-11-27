import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MemoryRouter, Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown'

ReactDOM.render(
    <MemoryRouter>
       <Container className="p-3" fluid="md">
      <Row>
        <Col>
            <Card bg="ligh">
            <Card.Header>
              {/* <Nav className="justify-content-center">
                <Nav.Item>
                    <Nav.Link href="/levels">
                    <LinkContainer to="/levels">
                            <Button variant="primary">Home</Button>
                    </LinkContainer>
                    </Nav.Link>
                </Nav.Item>
              </Nav> */}
              <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
              {/* <Navbar.Brand href="/levels">Home</Navbar.Brand> */}
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/levels">
                    <LinkContainer to="/levels">
                      <span variant="primary">Home</span>
                    </LinkContainer>
                  </Nav.Link>
                  {/* <Nav.Link>
                    <LinkContainer to="/download">
                      <span variant="primary">Download</span>
                    </LinkContainer>
                  </Nav.Link> */}
                </Nav>
                <Nav>
                  <NavDropdown title="Settings" id="collasible-nav-dropdown">
                      <NavDropdown.Item>
                          <LinkContainer to="/download">
                            <span>Download Google Sheet</span>
                          </LinkContainer>
                      </NavDropdown.Item>
                 
                      <NavDropdown.Item href="/createlist">Create a new words list</NavDropdown.Item>
                      <NavDropdown.Item href="/editlist">Edit a words list </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
              
              </Card.Header>
            <App />
            </Card>
          </Col>
        </Row>
      </Container>
    </MemoryRouter>
  , document.getElementById('root'));
