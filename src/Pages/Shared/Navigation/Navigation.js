import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">

                        <Nav className="me-auto">
                            <LinkContainer to="/">
                                <Nav.Link>HOME</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/dashboard">
                                <Nav.Link>DASHBOARD</Nav.Link>
                            </LinkContainer>
                        </Nav>

                        <Nav>
                            <LinkContainer to="/login">
                                <Nav.Link>LOGIN</Nav.Link>
                            </LinkContainer>

                            <LinkContainer to="/resister">
                                <Nav.Link>SIGNUP</Nav.Link>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Navigation;