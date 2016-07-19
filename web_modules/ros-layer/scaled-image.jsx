import React from 'react';

export default class ScaledImage extends React.Component {
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
        return (
            <div
                className="scaled-image"
                style={{backgroundImage: 'url('+this.props.src.replace(/ /g, '%20')+')'}}
            />
        )
    }
}
