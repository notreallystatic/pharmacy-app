import React, { Component, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createHashHistory } from 'history';

const history = createHashHistory();

export const Header = (props) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Link to='/dashboard' className='navbar-brand'>
        Pharma&nbsp;<span className='fas fa-file-medical-alt'></span>
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {props.user ? (
            <Fragment>
              <Nav.Link disabled href='#'>
                Welcome : {props.user.name}&nbsp;
                <i className='fas fa-user-tie'></i>
              </Nav.Link>
              <Link
                to='/'
                className='nav-link'
                onClick={() => {
                  history.push('/');
                  props.logout();
                }}
              >
                Logout&nbsp;<i className='fas fa-sign-out-alt'></i>
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to='/login' className='nav-link'>
                Sign in&nbsp;<span className='fas fa-sign-in-alt'></span>
              </Link>
              <Link to='/register' className='nav-link'>
                Sign up&nbsp;<span className='fas fa-user-plus'></span>
              </Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
