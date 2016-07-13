global.EventEmitter2 = require('eventemitter2');
var ROSLIB = require('roslib');

// define a singleton with the live websocket connection
var ros = new ROSLIB.Ros({
    url: process.env.ROSBRIDGE_URI
});

ros.on('error', function(error) {
    console.log('ROSBridge error', error);
});

// Find out exactly when we made a connection.
ros.on('connection', function() {
    console.log('ROSBridge Connection made!');
});

ros.on('close', function() {
    console.log('ROSBridge Connection closed. Reconnecting.');
    setTimeout(function(){
        ros.connect(process.env.ROSBRIDGE_URI);
    }, 5000);
});

export {ros, ROSLIB}
export default ros
