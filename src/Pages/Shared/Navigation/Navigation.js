import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const Navigation = () => {
    const { login, setLogin, user } = useAuth();
    const [userName, setUserName] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const data = JSON.parse(localStorage.getItem('userData'));
            setUserName(data[user].name);
        }
    }, [user]);

    const handleLogOut = () => {
        localStorage.removeItem('userData');
        setLogin(false);
        navigate('/');
    }

    return (
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">

                    <Nav className="me-auto">
                        {
                            !login && <LinkContainer to="/">
                                <Nav.Link>HOME</Nav.Link>
                            </LinkContainer>
                        }

                        {
                            login && <LinkContainer to="/dashboard">
                                <Nav.Link>DASHBOARD</Nav.Link>
                            </LinkContainer>
                        }
                    </Nav>

                    <Nav>
                        {
                            !login && <LinkContainer to="/resister">
                                <Nav.Link>SIGNUP</Nav.Link>
                            </LinkContainer>
                        }

                        {
                            !login && <LinkContainer to="/login">
                                <Nav.Link>LOGIN</Nav.Link>
                            </LinkContainer>

                        }

                        {
                            login && <Navbar.Text>
                                Hi {userName}
                            </Navbar.Text>
                        }

                        {
                            login && <Nav.Link onClick={handleLogOut}>
                                LOGOUT
                            </Nav.Link>
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation;