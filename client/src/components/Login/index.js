import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (props.user) props.history.push('/dashboard');
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email.length === 0 && password.length === 0) {
      alert('Enter email id and password');
    } else {
      console.log(email, password);
      // post email & username to backend.
      // If no error then call props.login(userData);
      props.login({ name: email });
      props.history.push('/');
    }
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={12} className='my-3'>
          <p>
            <h3 className='text-center'>Sign up!</h3>
          </p>
        </Col>
        <Col xs={12} md={6}>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId='email'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='Email Address'
                required
              />
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                required
              />
            </Form.Group>

            <Form.Row
              style={{ display: 'flex', WebkitJustifyContent: 'center' }}
              className='my-2'
            >
              <Button variant='dark' type='submit' onClick={onSubmit}>
                Log in
              </Button>
            </Form.Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
