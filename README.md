# JoyRIDE

JavaScript Robot IDE

### Installation

    npm install

### Usage

Run `npm start` and navigate a web browser to [http://localhost:8080/](http://localhost:8080/)

### Deployment

Run `npm run build`, then copy the contents of the `public/` directory to your web server.

Make sure to start rosbridge:

    roslaunch rosbridge_server rosbridge_websocket.launch
