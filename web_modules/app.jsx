import React from 'react';
import {ros, ROSLIB} from 'ros';
import ROSLayer from 'ros-layer';
import ROSMessageSender from 'ros-message-sender';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ROSLayer topic="/joyride/background" />
                <ROSLayer topic="/joyride/foreground" />
                <ROSMessageSender topic="/joyride/foreground"/>
            </div>
        );
    }
}
