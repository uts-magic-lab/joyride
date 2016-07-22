import React from 'react';
import ros from 'ros';

// a multiple-choice question that can send the answer as a ROS Message.
// by default, it sends the entered text as a String.
// with the property `fields`, it sends a JSON string with the
// specified fields and the entered text as 'value'

export default class ROSButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: null
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.topic = ros.Topic({
            name: this.props.topic,
            messageType: 'std_msgs/String'
        });
    }

    handleClick(event) {
        var value = event.target.value;
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
        this.setState({
            selection: event.target.value
        })
    }

    render() {
        const options = this.props.options || [];
        const buttons = options.map((option, i)=>{
            return (
                <button type="button"
                key={i}
                disabled={this.state.selection != null}
                className={this.state.selection == option ? "selected" : ""}
                onClick={this.handleClick}
                name="answer"
                value={option}>
                    {option}
                </button>
            )
        });

        return (
            <form className="ros-layer-buttons">
                <p>{this.props.text}</p>
                {buttons}
            </form>
        )
    }
}
