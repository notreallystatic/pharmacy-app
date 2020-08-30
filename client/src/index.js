import React from 'react';
import ReactDOM from 'react-dom';
import ParentApp from './App';
import * as serviceWorker from './serviceWorker';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<ParentApp />, document.getElementById('root'));

serviceWorker.register();
