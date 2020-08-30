import React, { Component, Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { createHashHistory } from 'history';

const history = createHashHistory();

export const Header = (props) => {
  return (
    <Navbar bg='dark' variant='dark' expand='lg'>
      <Link to='/dashboard' className='navbar-brand'>
        Pharma
      </Link>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ml-auto'>
          {props.user ? (
            <Fragment>
              <Nav.Link disabled href='#'>
                Welcome : {props.user.name}{' '}
              </Nav.Link>
              <Link
                to='/'
                className='nav-link'
                onClick={() => {
                  history.push('/');
                  props.logout();
                }}
              >
                Logout
              </Link>
            </Fragment>
          ) : (
            <Fragment>
              <Link to='/login' className='nav-link'>
                Sign in
              </Link>
              <Link to='/register' className='nav-link'>
                Sign up
              </Link>
            </Fragment>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
