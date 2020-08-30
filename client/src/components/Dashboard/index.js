import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Illustrations } from '../../assets/illustrations';
import precriptionImage from '../../assets/images/prescription.jpg';
import medicineImage from '../../assets/images/medicines.jpg';
import styles from './Dashboard.module.css';

export const Dashboard = (props) => {
  useEffect(() => {
    if (!props.user) {
      props.history.push('/');
    }
  }, []);

  return (
    <Container className='my-5'>
      <Row className='justify-content-center'>
        <Col
          xs={12}
          md={4}
          style={{ display: 'flex', justifyContent: 'center' }}
          className='mb-4'
        >
          <Card style={{ width: '18rem', height: '400px' }}>
            <Card.Img
              className={styles.cardImage}
              variant='top'
              src={medicineImage}
            />
            <Card.Body>
              <Card.Title>Refill?</Card.Title>
              <Card.Text>
                Browser medicines from the eligible list and place an order
                quickly.
              </Card.Text>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant='success'
                  onClick={() => props.history.push('/buy')}
                >
                  Buy Medicines&nbsp;
                  <span className='fas fa-shopping-cart'></span>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col
          xs={12}
          md={4}
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <Card style={{ width: '18rem', height: '400px' }}>
            <Card.Img
              className={styles.cardImage}
              variant='top'
              src={precriptionImage}
            />
            <Card.Body>
              <Card.Title>New Prescription?</Card.Title>
              <Card.Text>
                Got a new Precription? Dont worry! Head over here and add in
                your new medicines!
              </Card.Text>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                  variant='primary'
                  onClick={() => props.history.push('/add')}
                >
                  Add Precription?&nbsp;
                  <i className='fas fa-clipboard-list'></i>
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
