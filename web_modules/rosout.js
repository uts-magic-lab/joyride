import TraceKit from 'tracekit';
TraceKit.collectWindowErrors = false;
TraceKit.remoteFetching = false;

function log(topic, level, arg) {
    var error, errorDepth;
    if (arg instanceof Error) {
        error = arg;
        errorDepth = 0;
    }
    else {
        error = new Error(arg);
        errorDepth = 1;
    }
    var message = {
        name: '/joyride',
        level: level,
        msg: error.message
    };

    var trace = TraceKit.computeStackTrace(error);
    var errorInfo = trace.stack[errorDepth];
    if (errorInfo) {
        message.file = errorInfo.url;
        message.function = errorInfo.func;
        message.line = errorInfo.line;
    }

    return topic.publish(message);
}

export default function rosout(ros) {
    var rosoutTopic = ros.Topic({
        name: '/rosout',
        messageType: '/rosgraph_msgs/Log'
    });

    return {
        logdebug: log.bind(ros, rosoutTopic, 1),
        loginfo:  log.bind(ros, rosoutTopic, 2),
        logwarn:  log.bind(ros, rosoutTopic, 4),
        logerr:   log.bind(ros, rosoutTopic, 8),
        logfatal: log.bind(ros, rosoutTopic, 16)
    }
}
