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
    console.log("Connected to ROSBridge", ros.socket.url);
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
