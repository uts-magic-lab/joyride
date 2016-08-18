import React from 'react';
import ros from 'ros';

const emotions = [
    {name: "Neutral", color: ""},
    {name: "Anger", color: "red"},
    {name: "Anticipation", color: "orange"},
    {name: "Joy", color: "yellow"},
    {name: "Trust", color: "green"},
    {name: "Fear", color: "darkgreen"},
    {name: "Surprise", color: "cyan"},
    {name: "Sadness", color: "blue"},
    {name: "Disgust", color: "purple"}
];

export default class EmotionPicker extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.choose = this.choose.bind(this);
        this.state = {
            open: false,
            emotion: this.props.emotion || emotions[0]
        };
    }

    componentDidMount() {
        const topicRoot = this.props.topic || '/joyride/emotion';
        this.nameTopic = ros.Topic({
            name: topicRoot,
            messageType: 'std_msgs/String'
        });
        this.colorTopic = ros.Topic({
            name: `${topicRoot}/color`,
            messageType: 'std_msgs/String'
        });
    }

    componentWillUnmount() {
        this.nameTopic.unadvertise();
        this.colorTopic.unadvertise();
    }

    toggle(event) {
        this.setState({
            open: !this.state.open
        })
    }

    choose(event) {
        const emotion = {
            name: event.target.name,
            color: event.target.value
        };
        this.nameTopic.publish({
            data: emotion.name
        });
        this.colorTopic.publish({
            data: emotion.color
        });
        this.setState({
            open: false,
            emotion: emotion
        });
    }

    render() {
        const buttons = emotions.map((emotion, i)=>{
            return (
                <button
                className="pure-button"
                key={i}
                style={{background:emotion.color, width: '100%'}}
                name={emotion.name}
                value={emotion.color}
                onClick={this.choose}>
                    {emotion.name}
                </button>
            );
        });
        const popUpStyle = {
            position: 'absolute',
            right: 0,
            width: '10em',
            display: this.state.open?'block':'none'
        };
        return <div className="joyride-emotion-picker">
            <button className="pure-button" onClick={this.toggle}>Set Emotion</button>
            <div style={popUpStyle}>
                {buttons}
            </div>
        </div>
    }
}
