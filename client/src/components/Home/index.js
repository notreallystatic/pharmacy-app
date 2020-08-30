import React, { useState, useEffect } from 'react';
import { Component, Row, Col, Container, Card, Button } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
import { Illustrations } from '../../assets/illustrations';
import { Redirect } from 'react-router-dom';

export const Home = (props) => {
  useEffect(() => {
    if (props.user) props.history.push('/dashboard');
  }, []);

  return (
    <Container
      className='my-5'
      style={{
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Row className='justify-content-center'>
        <Col
          xs={12}
          md={6}
          className='my-2'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            size='lg'
            variant='success'
            style={{ width: '200px' }}
            onClick={() => props.history.push('/login')}
          >
            Sign in!
          </Button>
        </Col>
        <Col
          xs={12}
          md={6}
          className='my-2'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Button
            size='lg'
            variant='warning'
            style={{ width: '200px' }}
            onClick={() => props.history.push('/register')}
          >
            Sign Up!
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
