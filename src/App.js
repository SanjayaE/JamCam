import React, { Component } from 'react';
import capture from './services/capture.js';
<<<<<<< HEAD
import keyboard from './services/keyboard.js';
import keyboard2 from './services/keyboard2.js';
import loopsSection from './services/loops.js';
import tracks from './services/tracks.js';
import Mode1 from './views/_mode1.jsx';
import Mode2 from './views/_mode2.jsx';
import Record from './services/record';
import {
  playOnce,
  startLoop,
  stopAudio,
  playNote
} from './services/tone_manager.js';
=======
import { stopAudio } from './services/tone_manager.js';
>>>>>>> 0bf23a61dea359056eec0802b82f04d6cdea814d
import { CameraStart, CameraStop } from './services/camera.js';
import JamCam from './components/jam_cam.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: 1
        };
    }


    // componentDidMount = async () => {
    //     //Start Camera
    //     CameraStart();
    //     //Start Capture and Provide Callback
    //     capture(this.receiveNewBodyPartLocation);
    // };

<<<<<<< HEAD
  //Checks if loop active, then updates the state of loops
  loopCheck = (type, loop, state) => {
    let loops = { ...this.state.loops };
    let tracks = { ...this.state.tracks };
    [type][loop].active = state;
    this.setState({ loops, tracks });
  };
=======
    // componentWillUnmount = () => {
    //     //turn off camera and audio when you switch from the video page
    //     CameraStop();
    //     stopAudio();
    // };
>>>>>>> 0bf23a61dea359056eec0802b82f04d6cdea814d


    render() {
        return (
            <div className="container">
                < JamCam />
            </div>
        )
    }
<<<<<<< HEAD
    let loops = { ...this.state.loops };
    for (let loop in loops) {
      loops[loop].active = false;
    }
    this.setState({ loops });
  };

  componentDidMount = async () => {
    console.log('did mount');

    this.hideLoader();
    //Start Camera
    // CameraStart();
    // //Start Capture and Provide Callback
    // capture(this.receiveNewBodyPartLocation);
  };

  hideLoader = () => {
    CameraStart();
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
    //Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  componentWillUnmount = () => {
    //find a way to stop capturing and tone.js
    console.log('unmount');
    //this will reload the homepage and stop process , not a great way to stop, temp fix.
    // window.location.reload();

    CameraStop();
    stopAudio();
  };

  //Takes in body part locations and maps to keyboard and loops
  receiveNewBodyPartLocation = bodyPartLocation => {
    this.setState(
      {
        bodyPartLocation
      },
      () => {
        if (this.state.mode === 1) {
          keyboard(
            this.state.bodyPartLocation.leftWrist,
            this.receiveKeyBoardPress
          );
          loopsSection(
            this.state.bodyPartLocation.rightWrist,
            this.receiveLoopPress
          );
        } else {
          keyboard2(
            this.state.bodyPartLocation.leftWrist,
            this.receiveKeyBoard2Press
          );
          loopsSection(
            this.state.bodyPartLocation.rightWrist,
            this.receiveLoopPress
          );
        }
      }
    );
  };

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

  render() {
    return (
      <div className="container">
        <div id="keyboard_container">
          <div id="keyboard">
            {this.state.mode === 1 ? (
              <Mode1 cb={this.defineClass} />
            ) : (
              <div>
                <Mode2 cb={this.defineClass} />
              </div>
            )}

            <video id="video" width="640" height="480" controls autoPlay />
            {/* <Loading visible={this.state.isLoading} /> */}
            <canvas id="overlay" />
            <Record />
            <br />
            <h3>
              {this.state.mode === 1 ? (
                <p>ACTIVATE MEGA JAM</p>
              ) : (
                <p> DE-ACTIVATE MEGA JAM</p>
              )}
            </h3>
            <label className="switch">
              <input type="checkbox" onClick={this.toggleMode} />
              <span className="slider round" />
            </label>
          </div>

          {/* >>>>>>> Debug info <<<<<<<<<< */}

          <div className="bodypart-info">
            <p>Current Body Part Location</p>
            {this.state.bodyPartLocation ? (
              <div>
                <p>Left Wrist - X {this.state.bodyPartLocation.leftWrist.x}</p>
                <p>Left Wrist - Y {this.state.bodyPartLocation.leftWrist.y}</p>
                <p>
                  Right Wrist - X {this.state.bodyPartLocation.rightWrist.x}
                </p>
                <p>
                  Right Wrist - Y {this.state.bodyPartLocation.rightWrist.y}
                </p>
              </div>
            ) : (
              <p>This is no body data at the moment, go dance</p>
            )}
          </div>
        </div>
      </div>
    );
  }
=======
>>>>>>> 0bf23a61dea359056eec0802b82f04d6cdea814d
}
export default App;
