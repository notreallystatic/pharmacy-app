import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { ClickPicture } from '../Camera';
import axios from 'axios';

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
      axios
        .get(`api/meds/${props.user._id}`)
        .then((res) => {
          setMedicines(res.data.meds);
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, []);

  const updateCart = (e) => {
    const [_id, name, requiresAuth] = e.target.id.split('-');

    console.log(e.target.checked);
    if (e.target.checked) {
      // uncheck it & remove it from cart
      setCart([...cart, { _id: _id, name: name, requiresAuth: requiresAuth }]);
    } else {
      // Check it & add it in cart
      const updatedCart = cart.filter((m) => m._id != _id);
      setCart(updatedCart);
    }
  };

  const placeOrder = () => {
    if (!cart.length) {
      alert('Please add something to cart');
    } else if (picture) {
      // Sent the id and picture to backend.
      const formData = new FormData();
      formData.append('id', props.user._id);
      formData.append('picture', picture);

      axios
        .post('/api/auth', formData, {
          headers: {
            ContentType: 'multipart/form-data',
          },
        })
        .then((response) => {
          console.log(response.data.result);
          if (response.data.result) {
            alert('Successfully placed an order');
          } else {
            alert("Sorry, couldn't recognize your face.");
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      console.log(cart);
      axios
        .post('api/refill', {
          meds: cart,
        })
        .then((response) => {
          setRequiresAuth(response.data.requiresAuth);
          alert('please click a picture and resubmit again');
        })
        .catch((error) => {
          console.log(error.message);
        });
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
                <Col xs={6} key={med._id}>
                  <Form.Group
                    controlId={`${med._id}-${med.name}-${med.requiresAuth}`}
                  >
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
