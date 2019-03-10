import React, { Component } from 'react';
import capture from './services/capture.js';
import { stopAudio } from './services/tone_manager.js';
import { CameraStart, CameraStop } from './services/camera.js';
import JamCam from './components/jam_cam.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: 1
        };
    }

    render() {
        return (
            <div className="container">
                < JamCam />
            </div>
        )
    }
}
export default App;
