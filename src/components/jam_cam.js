import React, { Component } from 'react';
import InteractiveWindow from './interactive_window';
import Panel from './panel';
import { stopAudio, playNote } from '../services/tone_manager.js';
import capture from '../services/capture';
import { CameraStart, CameraStop } from '../services/camera';

class JamCam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bodyPartLocation: {
                leftWrist: {
                    x: 0,
                    y: 0
                },
                rightWrist: {
                    x: 0,
                    y: 0
                }
            },
            mode: 1,
        };
    }

    componentDidMount = async () => {
        //Start Camera
        CameraStart();
        //Start Capture and Provide Callback
        capture(this.receiveNewBodyPartLocation);
    };

    componentWillUnmount = () => {
        //turn off camera and audio when you switch from the video page
        CameraStop();
        stopAudio();
    };

    //Takes in body part locations and maps to keyboard and loops
    receiveNewBodyPartLocation = (bodyPartLocation) => {
        this.setState(
            {
                bodyPartLocation
            }
        );
    };

    render() {
        return (
            <div className="container">
                < InteractiveWindow leftWrist={this.state.bodyPartLocation.leftWrist} rightWrist={this.state.bodyPartLocation.rightWrist} />
                <video id="video" width="640" height="480" controls autoPlay />
                <canvas id="overlay" />
                < Panel />
            </div>
        );
    }
}

export default JamCam;