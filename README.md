# JoyRIDE

JavaScript Robot IDE

### Installation

Install [Node.js](http://nodejs.org/). Install the dependencies for this app by running:

    npm install

### Development

- Configure the environment

        export ROSBRIDGE_URI:='ws://192.168.99.100:9090'
        export PORT=8080

- Start the development web server

        npm start

- Navigate a web browser to [http://localhost:8080/](http://localhost:8080/)

### Deployment

Run `npm run build`, then copy the contents of the `public/` directory to your web server.

Make sure to start rosbridge:

    roslaunch rosbridge_server rosbridge_websocket.launch

### Usage

To command a JoyRIDE layer, send a ROS message of type `std_msgs/String` to `/joyride/foreground` or `/joyride/background` with the command as JSON. For example, to show your logo:

    rostopic pub -1 /joyride/foreground std_msgs/String "'{"type": "img", "value": "http://example.com/logo.png"}'"

#### Supported command types

- **`none`** (or any falsy value): Displays a transparent layer.

- **`color`**: Displays `value` as a solid color. Supports any CSS "background" format, such as `{"type":"color", "value":"rgba(200,0,0,0.5)"}`

- **`text`**: Displays `value` in brand appropriate font, centered onscreen.

    TODO: support styles, headings

- **`img`**: Displays `value` as the url to an image, scaled to be contained onscreen. Supports transparency.

- **`video`**: Displays `topic` as a ROS video feed. Supports JPEG format.

- **`page`**: Displays `value` as an iframe, with interaction enabled if `interactive` is set to true. (TBD)

- **`select`**: Displays `text` as a question and `options` as buttons to press. Sends the response as a String message to `/joyride/answer`.

- **`prompt`**: Asks `text` as a question and presents a keyboard to enter an answer. Sends the response as a String message to `/joyride/answer`.

- anything else: displays command onscreen as JSON to aid debugging
