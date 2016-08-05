require('./style.css');

import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ros from 'ros';
import ScaledImage from './scaled-image';
import ROSPrompt from './prompt';
import ROSVideoLayer from './video';
import ROSButtons from './buttons';
import ROSColorLayer from './color';

// ensure that messages always have a "type" and "key" when they are rendered
function parseMessage(text) {
    if (!text) {
        return {
            type: "none",
            key: "none"
        }
    }
    var data = null;
    if (typeof text != "string") {
        data = text;
        data.type = data.type || "error";
    }
    else {
        try {
            data = JSON.parse(text) || {};
        }
        catch (e) {
            data = {
                type: "error",
                error: e,
                value: text
            };
        }
    }
    // support taking an animation key as input
    data.key = data.key || Date.now();

    return data;
}

function safeClassName(name) {
    return name.replace(/[^a-z0-9]+/g, '-');
}

export default class ROSLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latestMessage: parseMessage(this.props.initialDisplay)
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.topic = ros.Topic({
            name: this.props.topic,
            messageType: 'std_msgs/String'
        });
        this.topic.subscribe((message)=>{
            this.setState({
                latestMessage: parseMessage(message.data)
            });
        });
    }

    componentWillUnmount() {
        this.topic.unsubscribe();
    }

    onSubmit() {
        // animate disappearance of submitted item
        this.setState({
            latestMessage: parseMessage(this.props.initialDisplay)
        });
    }

    render() {
        var item = null;
        var data = this.state.latestMessage;
        var key = data.key;
        var className = "ros-layer-"+safeClassName(data.type || 'unknown');
        if (data.type == "none") {
            item = null;
            key = 'none';
        }
        else if (data.type == "text") {
            let heading = null;
            if (data.heading) {
                heading = <h1>{data.heading}</h1>
            }
            item = <div className={className}>
                {heading}
                <p>{data.value}</p>
            </div>
        }
        else if (data.type == "color") {
            item = <ROSColorLayer color={data.value} />
            // always fade from one color to another
            key = "color";
        }
        else if (data.type == "img") {
            item = <ScaledImage src={data.value}/>
        }
        else if (data.type == "video") {
            item = <ROSVideoLayer topic={data.topic}/>
            // only animate changes between different channels
            key = "video-"+data.topic;
        }
        else if (data.type == "select") {
            let fields = null;
            if (data.name) {
                fields = { name: data.name };
            }
            item = <ROSButtons
                topic={data.topic || "/joyride/answer"}
                text={data.text}
                options={data.options}
                fields={fields}
                onSubmit={this.onSubmit}
            />
        }
        else if (data.type == "prompt") {
            let fields = null;
            if (data.name) {
                fields = { name: data.name };
            }
            item = <ROSPrompt
                topic={data.topic || "/joyride/answer"}
                text={data.text}
                fields={fields}
                onSubmit={this.onSubmit}
                autofocus
            />
        }
        else {
            // error and debug display
            item = <p className={className}>{data.value}</p>
        }

        return (
            <ReactCSSTransitionGroup className="ros-layer"
            transitionName={this.props.transitionName}
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}>
                <div className="ros-layer-item"
                key={key}>
                    {item}
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}
