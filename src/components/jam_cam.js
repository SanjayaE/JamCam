import React, { Component } from 'react';
import InteractiveWindow from './interactive_window';
import Panel from './panel';
import { stopAudio } from '../services/tone_manager';
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
            mode: 1
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

    //receives body part locations from capture and updates state
    receiveNewBodyPartLocation = bodyPartLocation => {
        this.setState({
            bodyPartLocation
        });
    };

    toggleMode = () => {
        let mode;
        if (this.state.mode === 1) {
            mode = 2;
        } else {
            mode = 1;
        }
        stopAudio()
        this.setState({ mode });
    };

    render() {
        return (
            <div className="container">
                <InteractiveWindow
                    leftWrist={this.state.bodyPartLocation.leftWrist}
                    rightWrist={this.state.bodyPartLocation.rightWrist}
                    mode={this.state.mode}
                />
                <video id="video" width="640" height="480" controls autoPlay />
                <canvas id="overlay" />
                <Panel mode={this.state.mode} toggleMode={this.toggleMode} />
            </div>
        );
    }
}

export default JamCam;
