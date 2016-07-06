global.EventEmitter2 = require('eventemitter2');
var ROSLIB = require('roslib');

// define a singleton with the live websocket connection
var ros = new ROSLIB.Ros({
  url : 'ws://192.168.99.100:9090'
});
ros.on('error', function(error) {
  console.log(error);
});

// Find out exactly when we made a connection.
ros.on('connection', function() {
  console.log('ROSBridge Connection made!');
});

ros.on('close', function() {
  console.log('OSBridge Connection closed.');
});

export {ros, ROSLIB}
