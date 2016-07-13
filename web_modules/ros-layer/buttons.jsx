require('./style.css');

import React from 'react';
import ros from 'ros';

export default class ROSButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {submitted: false};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.topic = ros.Topic({
            name: this.props.topic,
            messageType: 'std_msgs/String'
        });
    }

    handleClick(event) {
        this.selection = event.target.value;
    }

    handleSubmit(event) {
        event.preventDefault();
        this.topic.publish({
            data: this.selection
        });
        this.setState({submitted: true});
    }

    render() {
        var buttons = [];
        var options = this.props.options || [];
        options.forEach((option, i)=>{
            buttons.push(
                <button key={i}
                type="submit"
                name="selection"
                value={option}
                onClick={this.handleClick}>
                    {option}
                </button>
            )
        })
        var form =
            <form onSubmit={this.handleSubmit}>
                <p>{this.props.text}</p>
                {buttons}
            </form>

        return (
            <div className="ros-layer-buttons">
                {this.state.submitted ? null : form}
            </div>
        )
    }
}
