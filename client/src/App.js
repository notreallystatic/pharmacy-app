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
import { ToastProvider, useToasts } from 'react-toast-notifications';

const App = (props) => {
  const { addToast } = useToasts();
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const data = localStorage.getItem('user');
      setUser(JSON.parse(data));
    }
  }, []);

  const login = (userData) => {
    console.log(userData);
    addToast(`Welcome, ${userData.name}😉`, {
      appearance: 'error',
      autoDismiss: true,
    });
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    addToast(`See you soon, ${user.name}🤗`, {
      appearance: 'warning',
      autoDismiss: true,
    });
    setUser(undefined);
    localStorage.clear();
  };

  return (
    <Router>
      <ToastProvider>
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
            render={(props) => (
              <Register user={user} login={login} {...props} />
            )}
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
      </ToastProvider>
    </Router>
  );
};

const ParentApp = () => {
  return (
    <ToastProvider>
      <App />
    </ToastProvider>
  );
};

export default ParentApp;
