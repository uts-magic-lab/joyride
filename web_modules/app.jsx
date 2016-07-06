import React from 'react';
import {ros, ROSLIB} from 'ros';

export default class App extends React.Component {
    sayHello() {
        var myTopic = new ROSLIB.Topic({
            ros: ros,
            name: '/joyride/testing',
            messageType: 'std_msgs/String'
        });
        var myMessage = new ROSLIB.Message({
            data: "hello"
        });
        myTopic.publish(myMessage);
    }

    render() {
        return (
            <div>
                ROSLIB loaded successfully
                <br/>
                <button onClick={this.sayHello}>Say hello</button>
            </div>
        );
    }
}
