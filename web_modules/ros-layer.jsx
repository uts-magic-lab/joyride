import React from 'react';
import {ros, ROSLIB} from 'ros';

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
    }

    render() {
        return (
            <div className="ros-layer">
                <p>Subscribed to {this.props.topic}</p>
                <p>{this.state.latestMessage}</p>
            </div>
        );
    }
}
