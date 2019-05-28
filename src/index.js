import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import Home from './home'
import AppRouter from './appRouter';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import Login from './homepage/login'
import { Provider } from 'react-redux';
import store from './store';


ReactDOM.render(<Provider store={store}><AppRouter /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
