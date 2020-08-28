import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';

export class Register extends Component {

  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      name: "",
      password: "",
      email: "",
      address: "",
      picture: null,
      contact: 0,
      dob: "",
      dataUri: "",
      showModal: false
    }
  }
  
  componentDidMount() {
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);
  }

  startCamera = (idealFacingMode, idealResolution) => {
    this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }
 
  startCameraMaxResolution = (idealFacingMode) => {
    this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }
 
  takePhoto = () => {
    const config = {
      sizeFactor: 1
    };
 
    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ dataUri });
  }
 
  stopCamera = () => {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stoped!');
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  onChange = (e) => {
    this.setState({
     [e.target.id]: e.target.value 
    })
  }

  handleTakePhoto (dataUri) {
    console.log('takePhoto', dataUri);
    this.setState({
      clickPicture: false
    })
  }

  initCamera = () => {
    alert("please allow");
    this.setState({
      dataUri: ""
    })
    let facingMode = FACING_MODES.USER;
    let idealResolution = { width: 640, height: 480};
    this.startCamera(facingMode, idealResolution);
  }

  onClickCapture = () => {
    this.takePhoto();
    this.stopCamera();
  }

  render() {
    return (
      <Fragment>
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={4}>
              <Form onSubmit={this.onSubmit}>

                <Row className="justify-content-center my-2">
                  <Col>
                  <Form.Group controlId="name">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control type="text" value={this.name} onChange={this.onChange} placeholder="Full Name" required />
                  </Form.Group>

                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.email} onChange={this.onChange} placeholder="Email Address" required />
                  </Form.Group>
                  
                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" value={this.password} onChange={this.onChange} placeholder="Password" required />
                  </Form.Group>

                  <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" value={this.address} onChange={this.onChange} placeholder="Address" required />
                  </Form.Group>

                  <Form.Group controlId="dob">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" value={this.dob} onChange={this.onChange} required />
                  </Form.Group>

                  <Form.Group controlId="contact">
                    <Form.Label>Mobile Number</Form.Label>
                    <Form.Control type="tel" value={this.contact} onChange={this.onChange} placeholder="Mobile Number" required />
                  </Form.Group>

                  </Col>
                </Row>
                
                <div>
                  <Button onClick={this.initCamera}>Show Camera</Button>
                  {this.state.dataUri.length ? <img src={this.state.dataUri} alt="imageCamera"/> : (
                    <div>
                      <video
                        ref={this.videoRef}
                        autoPlay="true"
                      />
                      <Button onClick={this.onClickCapture}>Capture</Button>
                    </div>
                  )}
                </div>
                
                <Row style={{display: "flex", WebkitJustifyContent: "space-around"}} className="my-2"> 
                  <Button variant="dark"  type="submit">
                    Log in
                  </Button>
                </Row>
              </Form>

            </Col>

          </Row>
        </Container>

      </Fragment>
    )
  }
}
