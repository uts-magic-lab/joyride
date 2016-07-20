require('./style.css');

import React from 'react';
import ros from 'ros';

export default class ROSButtons extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selection: null
        };
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
        this.setState({
            selection: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        for (const button of event.target.querySelectorAll("button")) {
            button.disabled = true;
        }
        this.topic.publish({
            data: this.state.selection
        });
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.selection);
        }
    }

    render() {
        const options = this.props.options || [];
        const buttons = options.map((option, i)=>{
            return (
                <button key={i}
                className={this.state.selection == option ? "selected" : ""}
                type="submit"
                name="selection"
                value={option}
                onClick={this.handleClick}>
                    {option}
                </button>
            )
        });

        return (
            <form className="ros-layer-buttons" onSubmit={this.handleSubmit}>
                <p>{this.props.text}</p>
                {buttons}
            </form>
        )
    }
}
