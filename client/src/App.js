import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';
import {
  Header,
  Login,
  Register,
  Home,
  Dashboard,
  BuyMedicines,
  AddMedicines,
} from './components';
import './App.css';

const App = (props) => {
  const [user, setUser] = useState({
    name: 'Sachin Kumar',
  });

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(undefined);
  };

  return (
    <Router>
      <Header user={user} logout={logout} {...props} />
      <Switch>
        <Route
          exact
          path='/'
          render={(props) => <Home user={user} {...props} />}
        />
        <Route
          exact
          path='/dashboard'
          render={(props) => <Dashboard user={user} {...props} />}
        />
        <Route
          exact
          path='/login'
          render={(props) => <Login user={user} login={login} {...props} />}
        />
        <Route
          exact
          path='/register'
          render={(props) => <Register user={user} login={login} {...props} />}
        />
        <Route
          exact
          path='/add'
          render={(props) => <AddMedicines user={user} {...props} />}
        />
        <Route
          exact
          path='/buy'
          render={(props) => <BuyMedicines user={user} {...props} />}
        />
      </Switch>
    </Router>
  );
};

export default App;
