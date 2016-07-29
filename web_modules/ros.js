global.EventEmitter2 = require('eventemitter2');
var ROSLIB = require('roslib');
import rosout from './rosout';

// define a singleton with the live websocket connection
var ros = new ROSLIB.Ros({
    url: process.env.ROSBRIDGE_URI
});

// make logging functions available from the shared instance
Object.assign(ros, rosout(ros));

ros.on('error', function(error) {
    console.log('ROSBridge error', error);
});

// Find out exactly when we made a connection.
ros.on('connection', function connected() {
    console.log("Connected to ROSBridge", ros.socket.url);
    ros.loginfo(`${process.env.PACKAGE_NAME} v${process.env.PACKAGE_VERSION}` +
        ` started at ${document.location} on ${navigator.userAgent}`);
});

ros.on('close', function() {
    console.log('ROSBridge Connection closed. Reconnecting.');
    setTimeout(function(){
        ros.connect(process.env.ROSBRIDGE_URI);
    }, 5000);
    // note: other modules still need to re-subscribe to everything.
    // reloading the page is overkill
    // but it may be possible to re-mount components
});

export {ros, ROSLIB}
export default ros

if (process.env.NODE_ENV == 'debug') {
    window.ros = ros;
    window.ROSLIB = ROSLIB;    
}
