require('./style.css');

import React from 'react';
import {ros, ROSLIB} from 'ros';
import ROSMessageSender from 'ros-message-sender';

function isImage(path) {
    return path.match(/\.(jpg|jpeg|png|gif|svg|bmp|tiff)$/i);
}

function isJSON(string) {
    var data = null;
    try {
        data = JSON.parse(string);
        return data;
    }
    catch (e) {
        return false;
    }
}

export default class ROSLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              latestMessage: ""
        };
    }

    componentDidMount() {
        this.topic = new ROSLIB.Topic({
            ros: ros,
            name: this.props.topic,
            messageType: 'std_msgs/String'
        });
        this.topic.subscribe((msg)=>{
            this.setState({latestMessage: msg.data});
        });
        // this.setState({latestMessage: "Subscribed to "+this.props.topic});
    }

    render() {
        var item;
        var data = isJSON(this.state.latestMessage);
        if (data) {
            if (data.type == "keyboard") {
                item = <div className="ros-layer-item ros-layer-text">
                    <ROSMessageSender topic="/joyride/answer" autofocus/>
                </div>
            }
        }
        else if (isImage(this.state.latestMessage)) {
            item = <div
                className="ros-layer-item ros-layer-image"
                style={{backgroundImage: 'url('+this.state.latestMessage+')'}}
            />
        }
        else {
            item = <p className="ros-layer-item ros-layer-text">
                {this.state.latestMessage}
            </p>
        }

        return (
            <div className="ros-layer">{item}</div>
        );
    }
}
