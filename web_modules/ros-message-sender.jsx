import React from 'react';
import {ros, ROSLIB} from 'ros';

export default class ROSMessageSender extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    sendMessage(event) {
        event.preventDefault();
        var myTopic = new ROSLIB.Topic({
            ros: ros,
            name: this.props.topic,
            messageType: 'std_msgs/String'
        });
        var myMessage = new ROSLIB.Message({
            data: event.target.messageData.value
        });
        myTopic.publish(myMessage);
    }


    render() {
        return (
            <form onSubmit={this.sendMessage}>
                <input type="text" name="messageData" onChange={this.handleChange}/>
                <button type="submit">Send</button>
            </form>
        );
    }
}
