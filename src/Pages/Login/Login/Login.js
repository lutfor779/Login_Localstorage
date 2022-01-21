import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "../../Shared/style.css";

const Login = () => {
    const [loginData, setLoginData] = useState({});
    const [emailErr, setEmailErr] = useState(null);
    const [err, setErr] = useState(null);

    const { setLogin, setUser } = useAuth();
    const navigate = useNavigate();

    const userData = JSON.parse(localStorage.getItem("userData"));

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;

        if (field === "email") {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                setEmailErr("Please provide a valid email address");
                return;
            }
            setEmailErr(null);
        }
        setErr(null);
        const data = { ...loginData };
        data[field] = value;
        setLoginData(data);
    };


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (!userData) {
            setErr("Looks like new user! Resister first");
            return;
        }
        const emails = Object.keys(userData);
        const exits = emails.find(element => element === loginData.email);

        if (!exits) {
            setEmailErr("This email has not found");
            return;
        }
        setEmailErr(null);

        if (userData[exits].password !== loginData.password) {
            setErr("Password did not match");
            return;
        }
        setErr(null);

        setLogin(true);
        setUser(exits);
        navigate("/dashboard");
    };

    return (
        <div className='cntr'>
            <Container>
                <Form onSubmit={handleLoginSubmit}>
                    <p className="text">Sign In</p>
                    <hr />

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="rakhi@example.com"
                            required
                            name="email"
                            onChange={handleOnChange} />
                        {
                            emailErr && <Form.Text>{emailErr}</Form.Text>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="*******"
                            required
                            name="password"
                            onChange={handleOnChange} />
                        {
                            err && <Form.Text>{err}</Form.Text>
                        }
                    </Form.Group>

                    <Button
                        disabled={emailErr || err}
                        variant="primary"
                        type="submit"
                        className='upper-btn'>
                        <strong>SIGN IN</strong>
                    </Button>

                    <hr />
                    <p>New User</p>
                    <Button
                        variant="primary"
                        className='down-btn'
                        onClick={() => navigate("/resister")}>
                        <strong>SIGN UP</strong>
                    </Button>

                </Form>
            </Container>
        </div>
    );
};

export default Login;