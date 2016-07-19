import React from 'react';
import ros from 'ros';

export default class ROSMessageSender extends React.Component {
    constructor(props) {
        super(props);
        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        this.topic = ros.Topic({
            name: this.props.topic,
            messageType: 'std_msgs/String'
        });
    }

    sendMessage(event) {
        event.preventDefault();
        this.topic.publish({
            data: event.target.messageData.value
        })
    }

    render() {
        var autofocus = (input)=>{
            if (input && this.props.autofocus) {
                input.focus();
            }
        };
        return (
            <form onSubmit={this.sendMessage}>
                <input type="text"
                    name="messageData"
                    ref={autofocus}
                />
                <button type="submit">Send</button>
            </form>
        );
    }
}
