global.EventEmitter2 = require('eventemitter2');
var ROSLIB = require('roslib');

var ros = null;
var connectInterval = null;

function connect() {
    if (connectInterval) {
        clearInterval(connectInterval);
        connectInterval = null;
    }

    // define a singleton with the live websocket connection
    ros = new ROSLIB.Ros({
        url : 'ws://192.168.99.100:9090'
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
        connectInterval = setInterval(function(){
            connect();
        }, 1000);
    });
}
connect();

export {ros, ROSLIB}
