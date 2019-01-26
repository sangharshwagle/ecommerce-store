import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// You want your context provider highest up on the react tree so it you can pass data downwards

import {ProductProvider} from "./context"

ReactDOM.render(
    // over here iam making all the app to be a child component
    // of the router which is Browser router of the  react-router-dom
    // this is the only we can use route, link, swithch function of router
<ProductProvider >
    <Router>
        <App /> 
    </Router>
</ProductProvider>,
 document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
