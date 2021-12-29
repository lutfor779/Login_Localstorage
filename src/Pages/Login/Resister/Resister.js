import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Resister = () => {
    const [userData, setUserData] = useState({});
    const [resisterData, setResisterData] = useState({});

    const [emailErr, setEmailErr] = useState(null);
    const [passErr, setPassErr] = useState(null);
    const [confirmErr, setConfirmErr] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const users = JSON.parse(localStorage.getItem('userData'));
        users && setUserData(users);
    }, []);

    const handleOnChange = e => {
        const field = e.target.name;
        const value = e.target.value;

        if (field === 'email') {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                setEmailErr('Please provide a valid email address');
                return;
            }

            if (userData) {
                const emails = Object.keys(userData);
                const exits = emails.find(element => element === value);
                if (exits) {
                    setEmailErr('This email has already used');
                    return;
                }
            }


            setEmailErr(null);

        }

        if (field === "password") {
            if (value.length < 3) {
                setPassErr('Password must be at least 3 characters long');
                return;
            }
            setPassErr(null);
        }

        if (field === 'confirm_password') {
            if (value !== resisterData?.password) {
                setConfirmErr('Password did not match');
                return;
            }
            setConfirmErr(null);
        }

        const data = { ...resisterData };
        data[field] = value;
        setResisterData(data);
    }


    const handleSubmit = (e) => {
        e.preventDefault();

        userData[resisterData.email] = { name: `${resisterData.name}`, password: `${resisterData.password}` };

        localStorage.setItem('userData', JSON.stringify(userData));

        e.target.reset();
        navigate('/login');
    }



    return (
        <div className='cntr'>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <p className="text">Sign Up</p>
                    <hr />

                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Your Name"
                            required
                            name="name"
                            onChange={handleOnChange} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="lutfor@example.com"
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
                            passErr && <Form.Text>{passErr}</Form.Text>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="*******"
                            required
                            name="confirm_password"
                            onChange={handleOnChange} />
                        {
                            confirmErr && <Form.Text>{confirmErr}</Form.Text>
                        }
                    </Form.Group>

                    <Button
                        disabled={passErr || emailErr || confirmErr}
                        variant="primary"
                        type="submit"
                        className='upper-btn'>
                        <strong>SIGN UP</strong>
                    </Button>

                    <hr />
                    <p>Already signed up?</p>
                    <Button
                        variant="primary"
                        className='down-btn'
                        onClick={() => navigate('/login')}>
                        <strong>SIGN IN</strong>
                    </Button>

                </Form>
            </Container>
        </div>
    );
};

export default Resister;