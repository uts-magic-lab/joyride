require('./style.css');

import React from 'react';
import ros from 'ros';

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
        this.topic.publish({
            data: this.state.selection
        });
        if (this.props.onSubmit) {
            this.props.onSubmit(this.state.selection);
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
                name="selection"
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
