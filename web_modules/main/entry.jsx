require('file?name=index.html!./index.html');
require('./style.css');

window.EventEmitter2 = require('eventemitter2');
window.ROSLIB = require('roslib');
import React from 'react';
import ReactDOM from 'react-dom';

export class App extends React.Component {
    render() {
        return (
            <div>ROSLIB loaded successfully</div>
        );
    }
}

ReactDOM.render(<App/>, document.querySelector('#app'));
