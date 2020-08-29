import React, { Component, Fragment } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  AccordionCollapse,
} from 'react-bootstrap';
import { ClickPicture } from '../Camera';
import FormData from 'form-data';
import axios from 'axios';

export class Register extends Component {
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      name: '',
      password: '',
      email: '',
      address: '',
      picture: null,
      contact: 0,
      dob: '',
      dataUri: '',
      showCamera: false,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.history.push('/dashboard');
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', this.state.name);
    formData.append('picture', this.state.picture);

    axios
      .post('http://localhost:5000/api/register', formData, {
        headers: {
          ContentType: 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  onChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  setPicture = (dataUri) => {
    this.setState({
      picture: dataUri,
    });
  };

  render() {
    return (
      <Fragment>
        <Container>
          <Row className='justify-content-center'>
            <Col xs={12} className='my-3'>
              <p>
                <h3 className='text-center'>Sign up!</h3>
              </p>
            </Col>
            <Col xs={12} md={4}>
              <Form onSubmit={this.onSubmit}>
                <Row className='justify-content-center my-2'>
                  <Col>
                    <Form.Group controlId='name'>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type='text'
                        value={this.name}
                        onChange={this.onChange}
                        placeholder='Full Name'
                      />
                    </Form.Group>

                    <Form.Group controlId='email'>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type='email'
                        value={this.email}
                        onChange={this.onChange}
                        placeholder='Email Address'
                      />
                    </Form.Group>

                    <Form.Group controlId='password'>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type='password'
                        value={this.password}
                        onChange={this.onChange}
                        placeholder='Password'
                      />
                    </Form.Group>

                    <Form.Group controlId='address'>
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type='text'
                        value={this.address}
                        onChange={this.onChange}
                        placeholder='Address'
                      />
                    </Form.Group>

                    <Form.Group controlId='dob'>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type='date'
                        value={this.dob}
                        onChange={this.onChange}
                      />
                    </Form.Group>

                    <Form.Group controlId='contact'>
                      <Form.Label>Mobile Number</Form.Label>
                      <Form.Control
                        type='tel'
                        value={this.contact}
                        onChange={this.onChange}
                        placeholder='Mobile Number'
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  {this.state.showCamera ? (
                    <ClickPicture setPicture={this.setPicture} />
                  ) : (
                    <Button
                      variant='success'
                      onClick={() => this.setState({ showCamera: true })}
                    >
                      Use Camera
                    </Button>
                  )}
                </Row>

                <Row
                  style={{
                    display: 'flex',
                    WebkitJustifyContent: 'space-around',
                  }}
                  className='my-2'
                >
                  <Button variant='dark' type='submit'>
                    Register
                  </Button>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      </Fragment>
    );
  }
}
