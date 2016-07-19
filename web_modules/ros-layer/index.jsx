require('./style.css');

import React from 'react';
import ros from 'ros';
import ScaledImage from './scaled-image';
import ROSMessageSender from 'ros-message-sender';
import ROSVideoLayer from './video';
import ROSButtons from './buttons';

function tryJSON(string) {
    var data = null;
    try {
        data = JSON.parse(string);
        return data;
    }
    catch (e) {
        return false;
    }
}

}

export default class ROSLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
              latestMessage: ""
        };
    }

    componentDidMount() {
        this.topic = ros.Topic({
            name: this.props.topic,
            messageType: 'std_msgs/String'
        });
        this.topic.subscribe((msg)=>{
            this.setState({latestMessage: msg.data});
        });
        this.setState({latestMessage: this.props.initialDisplay || ''});
    }

    componentWillUnmount() {
        this.topic.unsubscribe()  
    }

    render() {
        var item=null;
        var message = this.state.latestMessage || '';
        var data = tryJSON(message);
        if (data) {
            if (data.type == "prompt") {
                item = <div className="ros-layer-item ros-layer-text">
                    <ROSMessageSender topic="/joyride/answer" autofocus/>
                </div>
            }
            else if (data.type == "img") {
                item = makeImage(data.value);
            }
            else if (data.type == "video") {
                item = <ROSVideoLayer topic={data.topic}/>
            }
            else if (data.type == "color") {
                item = <div className="ros-layer-color" style={{background: data.value}} />
            }
            else if (data.type == "select") {
                item = <ROSButtons text={data.text} options={data.options} topic={data.topic}/>
            }
        else if (data.type == "img") {
            item = <ScaledImage src={data.value} />
        }
        if (!item) {
            item = <p className="ros-layer-item ros-layer-text">
                {message}
            </p>
        }

        return (
            <div className="ros-layer">{item}</div>
        );
    }
}
