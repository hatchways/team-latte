import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';
//import Signup from './Signup'
import Login from './pages/login'
import {BrowserRouter as Router} from 'react-router-dom'
import Landing from './pages/Landingpage'
import App from './App';

ReactDOM.render(<Router>
    <App />
    </Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
