import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ClickPicture } from '../Camera';

const fuzzysort = require('fuzzysort');

export const BuyMedicines = (props) => {
  const [medicines, setMedicines] = useState([]);
  const [cart, setCart] = useState([]);
  const [requiresAuth, setRequiresAuth] = useState(false);
  const [picture, setPicture] = useState(null);
  const [camera, showCamera] = useState(false);

  useEffect(() => {
    if (!props.user) props.history.push('/');
    else {
      // Get the medicines from backend for the user : props.user._id & then fill the medicines array
      const data = [
        {
          name: 'abc',
          id: 123,
        },
        {
          name: 'def',
          id: 124,
        },
        {
          name: 'ghi',
          id: 125,
        },
        {
          name: 'jkl',
          id: 126,
        },
        {
          name: 'mno',
          id: 127,
        },
      ];
      setMedicines(data);
    }
  }, []);

  const updateCart = (e) => {
    console.log(e.target.id);
    const [id, name] = e.target.id.split('-');

    console.log(e.target.checked);
    if (e.target.checked) {
      // uncheck it & remove it from cart
      setCart([...cart, { id: id, name: name }]);
    } else {
      // Check it & add it in cart
      const updatedCart = cart.filter((m) => m.id != id);
      setCart(updatedCart);
    }
  };

  const placeOrder = () => {
    if (!cart.length) {
      alert('Please add something to cart');
    }
    // if picture is already clicked then simply
    else if (picture) {
      console.log(cart);
      // Make an api call to /order to see if the medicines require further auth or not.
      // if they do, setPicture(true). So that we can take a picture and send it to backend.
      alert('data sent');
    } else {
      setRequiresAuth(true);
    }
  };

  const clickPicture = (dataUri) => {
    setPicture(dataUri);
  };

  return (
    <Container className='my-3'>
      <Row className='justify-content-center'>
        <h3 className='text-center w-100 my-2'>Buy new medicines:</h3>
        <Col xs={12} md={6} className='order-1 order-md-2 my-2'>
          <h3 className='text-center w-100 my-2'>
            Select the medicines to buy:
          </h3>

          <Row>
            {medicines.map((med, index) => {
              return (
                <Col xs={6} key={med.id}>
                  <Form.Group controlId={`${med.id}-${med.name}`}>
                    <Form.Check
                      style={{ display: 'inline' }}
                      label={med.name}
                      onClick={updateCart}
                    />
                  </Form.Group>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col
          xs={12}
          md={6}
          style={{ background: 'white' }}
          className='my-2 py-2'
        >
          <h3 style={{ display: 'inline' }}>Cart:</h3>
          <div style={{ display: 'inline' }}>
            {cart.map((med, index) => {
              return (
                <span
                  className='m-1 px-2 mx-2 my-1 py-2'
                  style={{
                    background: '#BEBEBE',
                    minWidth: '90px',
                    borderRadius: '50px',
                    textAlign: 'center',
                    display: 'inline-block',
                  }}
                  key={med.id}
                >
                  {med.name}
                </span>
              );
            })}
          </div>
        </Col>
      </Row>
      <Col xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
        {requiresAuth ? (
          <Row>
            {showCamera ? (
              <ClickPicture setPicture={clickPicture} />
            ) : (
              <Button variant='success' onClick={() => showCamera(true)}>
                Use Camera
              </Button>
            )}
          </Row>
        ) : null}
        <br />
      </Col>
      <Col
        xs={12}
        className='my-3'
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <Button variant='dark' size='lg' onClick={placeOrder}>
          Order Now!
        </Button>
      </Col>
    </Container>
  );
};
