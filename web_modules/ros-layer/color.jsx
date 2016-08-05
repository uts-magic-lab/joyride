import React from 'react';
import ros from 'ros';

export default class ROSColorLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: props.color
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.color) {
            this.setState({color: nextProps.color});
        }
    }

    componentDidMount() {
        if (this.props.topic) {
            this.topic = ros.Topic({
                name: this.props.topic,
                messageType: 'std_msgs/String'
            });
            this.topic.subscribe((msg)=>{
                this.setState({color: msg.data || this.props.color});
                // TODO: consider also setting document.body.style.background
            });
        }
    }

    componentWillUnmount() {
        if (this.topic) {
            this.topic.unsubscribe();
        }
    }

    render() {
        if ('opacity' in this.props) {
            var tintAlpha = 1 - (this.props.opacity || 1);
            var tintColor = `rgba(255,255,255,${tintAlpha})`;
        }
        return (
            <div
                className="ros-layer-color"
                style={{background: this.state.color}}>
                <div
                    className="ros-layer-color"
                    style={{background: tintColor}}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
