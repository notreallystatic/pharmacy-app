import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Badge } from 'react-bootstrap';
import { ClickPicture } from '../Camera';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';

const fuzzysort = require('fuzzysort');

export const BuyMedicines = (props) => {
  const { addToast } = useToasts();
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
          addToast(
            `Sorry🙁, we couldn't fetch your medicines. Please, try again later. 🤗`,
            {
              appearance: 'error',
              autoDismiss: true,
            }
          );
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
            addToast(
              `We confirmed it's really you. Your order is placed, you can now sit back and relax!😊`,
              {
                appearance: 'success',
                autoDismiss: true,
              }
            );
          } else {
            addToast(
              `It seems that you aren't ${props.user.name}😮. So, we couldn't place your order. Contact our admin if you still think there's a problem from our side.🙋‍♂️`,
              {
                appearance: 'error',
                autoDismiss: true,
              }
            );
            setPicture(null);
          }
          props.history.push('/dashboard');
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post('api/refill', {
          meds: cart,
        })
        .then((response) => {
          if (response.data.requiresAuth) {
            setRequiresAuth(response.data.requiresAuth);
            addToast(
              `It seems that some of the medicines in your cart requires face atuhentication. Plese, click a picture and submit again`,
              {
                appearance: 'warning',
                autoDismiss: true,
              }
            );
          } else {
            addToast(`Successfully placed your order!🤩`, {
              appearance: 'success',
              autoDismiss: true,
            });
            props.history.push('/');
          }
        })
        .catch((error) => {
          addToast(
            `There was some error while placing your order, please try again later. 🤗`,
            {
              appearance: 'error',
              autoDismiss: true,
            }
          );
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
            <small>Select the medicines to buy</small>
          </h3>
          <p className='text-center'>
            <Badge pill variant='danger'>
              RFA
            </Badge>
            &nbsp;=&nbsp;<small>Requires Face Auth</small>
          </p>
          <Row>
            {medicines.map((med, index) => {
              return (
                <Col xs={6} key={med._id}>
                  <Form.Group
                    style={{ display: 'flex', alignItems: 'center' }}
                    controlId={`${med._id}-${med.name}-${med.requiresAuth}`}
                  >
                    <Form.Check
                      style={{ display: 'inline' }}
                      label={med.name}
                      onClick={updateCart}
                    />
                    {med.requiresAuth ? (
                      <small>
                        <Badge pill variant='danger'>
                          <small>RFA</small>
                        </Badge>
                      </small>
                    ) : null}
                  </Form.Group>
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col xs={12} md={6} className='my-2 py-2'>
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
                Use Camera&nbsp;<i className='fas fa-camera'></i>
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
          Order Now!&nbsp;<i className='fas fa-shopping-basket'></i>
        </Button>
      </Col>
      <Row>
        <Col xs={12} md={6}>
          <h3>Some links you might find useful</h3>
          <ul>
            <li>
              <h5>
                <small>
                  <a
                    href='https://www.youtube.com/watch?v=D9tTi-CDjDU'
                    target='_blank'
                  >
                    What is Coronavirus
                  </a>
                </small>
              </h5>
            </li>
            <li>
              <h5>
                <small>
                  <a
                    href='https://www.youtube.com/watch?v=21MIvkk7Imc'
                    target='_blank'
                  >
                    Ways to protect yourself from Corona.
                  </a>
                </small>
              </h5>
            </li>
            <li>
              <h5>
                <small>
                  <a
                    href='https://www.youtube.com/watch?v=bvLvExUxlNE'
                    target='_blank'
                  >
                    Why you should run everyday?
                  </a>
                </small>
              </h5>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
