import 'file?name=index.html!./index.html';
import './style.css';

import React from 'react';
import {render} from 'react-dom';
import App from 'app';
import statusDisplay from 'status-display';

try {
    render(<App/>, document.getElementById('app'));
}
catch (error) {
    statusDisplay.set('Error', error.stack);
}
