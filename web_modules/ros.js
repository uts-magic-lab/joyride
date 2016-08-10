global.EventEmitter2 = require('eventemitter2');
var ROSLIB = require('roslib');
import rosout from './rosout';
import statusDisplay from 'status-display';

// define a singleton with the live websocket connection
statusDisplay.set('Connecting', 'Connecting to ROS...');
var ros = new ROSLIB.Ros({
    url: process.env.ROSBRIDGE_URI
});
ros._connectAttempts = 1;
ros._connectSuccesses = 0;
// make logging functions available from the shared instance
Object.assign(ros, rosout(ros));

ros.on('error', function(error) {
    statusDisplay.set('Error', 'Error connecting to ROS');
});

ros.on('connection', function connected() {
    ros._connectSuccesses++;
    console.log(`Connected to ROSBridge ${ros.socket.url}`);
    if (statusDisplay.get() == 'Connecting') {    
        statusDisplay.set('OK', `Connected to ROS`);
    }
    ros.loginfo(`${process.env.PACKAGE_NAME} v${process.env.PACKAGE_VERSION}` +
        ` started at ${document.location} on ${navigator.userAgent}`);
});

ros.on('close', function() {
    if (ros._connectSuccesses < 1) {
        statusDisplay.set('Connecting', 'Connecting to ROS');
    }
    else {
        statusDisplay.set('Error', 'ROS Connection closed. Reconnecting...');
    }
    var delay = Math.min(60*1000, 5*1000 * ros._connectAttempts); // linear falloff
    setTimeout(function(){
        ros.connect(process.env.ROSBRIDGE_URI);
        ros._connectAttempts++;
        // note: other modules still need to re-subscribe to everything.
        // reloading the page will work,
        // but it may be possible to re-mount components
    }, delay);
});

export {ros, ROSLIB}
export default ros

if (process.env.NODE_ENV == 'debug') {
    window.myros = ros;
    window.myroslib = ROSLIB;
    window.myemitter = EventEmitter2;
}
