import React from 'react';
import ROSLayer from 'ros-layer';
import ROSPrompt from 'ros-layer/prompt';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <ROSLayer topic="/joyride/background" transitionName="transition-fade"/>
                <ROSLayer topic="/joyride/foreground" transitionName="transition-slide-up"/>
                <div style={{position: "relative", margin: "1em"}}>
                    <ROSPrompt topic="/joyride/background" text="Set Background:"/>
                    <ROSPrompt topic="/joyride/foreground" text="Set Foreground:"/>
                </div>
            </div>
        );
    }
}
