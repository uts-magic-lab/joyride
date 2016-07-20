import React from 'react';
import ROSLayer from 'ros-layer';
import ROSMessageSender from 'ros-message-sender';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ROSLayer topic="/joyride/background" transitionName="transition-fade"/>
                <ROSLayer topic="/joyride/foreground" transitionName="transition-slide-up"/>
                <label>
                    Set Background:
                    <ROSMessageSender topic="/joyride/background"/>
                </label>
                <br/>
                <label>
                    Set Foreground:
                    <ROSMessageSender topic="/joyride/foreground"/>
                </label>
            </div>
        );
    }
}
