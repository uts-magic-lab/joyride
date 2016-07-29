import 'file?name=index.html!./index.html';
import './style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';
import statusDisplay from 'status-display';

try {
    ReactDOM.render(<App/>, document.querySelector('main'));
}
catch (error) {
    statusDisplay.set('Error', error.stack);
}
