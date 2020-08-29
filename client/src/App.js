import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Header, Login, Register } from './components';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <ul>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
