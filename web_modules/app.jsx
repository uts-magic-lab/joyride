import React from 'react';
import {ros, ROSLIB} from 'ros';
import ROSLayer from 'ros-layer';
import ROSMessageSender from 'ros-message-sender';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <h1>JoyRIDE</h1>
                <p>ROSLIB loaded successfully</p>
                <ROSMessageSender topic="/joyride/foreground"/>
                <br/>
                <ROSLayer topic="/joyride/background" />
                <ROSLayer topic="/joyride/foreground" />
            </div>
        );
    }
}
