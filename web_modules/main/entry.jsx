require('file?name=index.html!./index.html');
require('./style.css');

import React from 'react';
import ReactDOM from 'react-dom';
import App from 'app';

ReactDOM.render(<App/>, document.querySelector('main'));
