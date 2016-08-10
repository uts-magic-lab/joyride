global.THREE = require('three');
require('three/examples/js/loaders/ColladaLoader');
require('three/examples/js/loaders/STLLoader');
var ROS3D = require('imports?ROSLIB=roslib!exports?ROS3D!ros3d/build/ros3d.js');

if (process.env.NODE_ENV == 'debug') {
    window.myros3d = ROS3D;
}

import React from 'react';
import {ros, ROSLIB} from 'ros';

var instanceCount = 0;

export default class ROS3DLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cid: instanceCount++
        };
        this.updateSize = this.updateSize.bind(this);
    }

    componentDidMount() {
        let param = ros.Param({name: this.props.param || 'robot_description'});
        param.get((robot_description)=>{
            console.log("got description");
            var model = new ROSLIB.UrdfModel({string: robot_description});
            this.setState({model: model});
        });

        this.viewer = new ROS3D.Viewer({
            divID: "ros3d-"+this.state.cid,
            width: 400,
            height: 400,
            antialias: true,
            background: '#002233'
        });
        this.viewer.addObject(new ROS3D.Grid({
            color: '#0181c4',
            cellSize: 0.5,
            num_cells: 20
        }));

        this.tfClient = ros.TFClient({
            angularThres : 0.01,
            transThres : 0.01,
            rate : 10.0,
            fixedFrame : '/rotating_frame'
        });

        this.urdfClient = new ROS3D.UrdfClient({
            ros: ros,
            tfClient: this.tfClient,
            rootObject: this.viewer.scene,
            loader:  ROS3D.COLLADA_LOADER
        });
    }

    updateSize(div) {
        // div.innerWidth is always undefined when this runs :(
        if (div.innerWidth && this.viewer) {
            this.viewer.renderer.setSize(div.innerWidth, div.innerHeight);
        }
    }

    render() {
        return (
            <div className="ros-layer-3d" ref={this.updateSize}>
                <div id={"ros3d-"+this.state.cid} />
                {this.state.model ? '' : 'robot model loading...'}
            </div>
        )
   }
}
