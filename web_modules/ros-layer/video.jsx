require('./style.css');

import React from 'react';
import ros from 'ros';

export default class ROSVideoLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            format: "",
            data: ""
        };
    }

    componentDidMount() {
        this.topic = ros.Topic({
            name: this.props.topic + '/compressed',
            messageType: 'sensor_msgs/CompressedImage'
        });
        this.topic.subscribe((msg)=>{
            this.setState(msg);
        });
    }

    componentWillUnmount() {
        this.topic.unsubscribe();  
    }

    render() {
        var src = "";
        if (this.state.format.match(/jpeg/)) {
            src = "data:image/jpeg;base64,"+this.state.data;
        }
        return <img className="ros-layer-video" src={src} />
    }
}
