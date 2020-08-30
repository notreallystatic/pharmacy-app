import React, { useState, useEffect } from 'react';
import {
  Component,
  Row,
  Col,
  Container,
  Card,
  Button,
  Image,
} from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
import { Dashboard } from '../Dashboard';
import { Illustrations } from '../../assets/illustrations';
import { Redirect } from 'react-router-dom';

export const Home = (props) => {
  useEffect(() => {
    console.log(props.user);
    if (props.user) props.history.push('/dashboard');
  }, []);

  useEffect(() => {
    if (props.user) {
      props.history.push('/dashboard');
    }
  }, props.user);

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
      <Row className='justify-content-center p-0'>
        <Col xs={12}>
          <h2 className='text-center'>
            <small>Welcome aboard user!</small>
          </h2>
        </Col>
        <Col
          xs={12}
          className='mt-2'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Image
            src={Illustrations.welcome}
            style={{ maxWidth: '250px', maxHeight: '200px' }}
            fluid
          />
        </Col>
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
            Sign in!&nbsp;<span className='fas fa-sign-in-alt'></span>
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
            Sign Up!&nbsp;<span className='fas fa-user-plus'></span>
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
