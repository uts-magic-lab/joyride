import React from 'react';
import ROSLayer from 'ros-layer';
import ROSPrompt from 'ros-layer/prompt';
import ROSColorLayer from 'ros-layer/color';
import EmotionPicker from 'emotion-picker';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.toggleFooter = this.toggleFooter.bind(this);
    }

    toggleFooter() {
        this.setState({footerOpen: !this.state.footerOpen});
    }

    render() {
        return (
            <div className="joyride-app">
                <main className="joyride-main">
                    <ROSLayer topic="/joyride/background" transitionName="transition-fade"/>
                    <ROSLayer topic="/joyride/foreground" transitionName="transition-slide-up"/>
                </main>
                <header className="joyride-header">
                    <ROSColorLayer topic="/joyride/emotion/color" color="#444" opacity={0.5}>
                        <div style={{position:"absolute",left:"1em"}}>
                            <button className="pure-button">Navigate</button>
                        </div>
                        <div style={{position:"absolute",right:"1em"}}>
                            <EmotionPicker />
                        </div>
                        <h1>{process.env.PACKAGE_NAME}</h1>
                    </ROSColorLayer>
                </header>
                <footer className={"joyride-footer" + (this.state.footerOpen ? " open" : "")}>
                    <div className="joyride-footer-expander" onClick={this.toggleFooter}>
                        {this.state.footerOpen ? "close" : "open"}
                    </div>
                    <ROSColorLayer topic="/joyride/emotion/color" color="#444" opacity={0.5}>
                        <div className="joyride-footer-items">
                            <ROSPrompt topic="/joyride/background" text="Set Background:"/>
                            <ROSPrompt topic="/joyride/foreground" text="Set Foreground:"/>
                        </div>
                    </ROSColorLayer>
                </footer>
            </div>
        );
    }
}
