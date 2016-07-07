require('./style.css');

import React from 'react';
import {ros, ROSLIB} from 'ros';

function isImage(path) {
    return path.match(/\.(jpg|jpeg|png|gif|svg|bmp|tiff)$/i);
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
        if (isImage(this.state.latestMessage)) {
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
