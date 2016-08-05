import React from 'react';
import ros from 'ros';

// a text entry prompt that can send entered text as a ROS Message.
// by default, it sends the entered text as a String.
// with the property `fields`, it sends a JSON string with the
// specified fields and the entered text as 'value'

export default class ROSPrompt extends React.Component {
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
        var input = event.target.querySelector('input');
        var value = input.value;
        var data = value;
        if (this.props.fields) {
            value = Object.assign({}, this.props.fields, {value: value});
            data = JSON.stringify(value);
        }
        this.topic.publish({
            data: data
        });
        if (this.props.onSubmit) {
            this.props.onSubmit(value);
        }
    }

    render() {
        var autofocus = (input)=>{
            if (input && this.props.autofocus) {
                input.focus();
            }
        };
        return (
            <form className="ros-prompt" onSubmit={this.sendMessage}>
                <label>
                    {this.props.text}
                    <input type="text"
                        name="answer"
                        ref={autofocus}/>
                </label>
                <button type="submit">Send</button>
            </form>
        );
    }
}
