import React, { useState } from "react"
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

export const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    // post email & username to backend.
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <Form onSubmit={onSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
            </Form.Group>
                
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            </Form.Group>

            <Row style={{display: "flex", WebkitJustifyContent: "center"}} className="my-2">
              <Button variant="dark" type="submit">
                Log in
              </Button>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}