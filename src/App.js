import React, { Component } from 'react';
import capture from './services/capture.js';
import camera from './services/camera.js';
import keyboard from './services/keyboard.js';
import loops from './services/loops.js';
import { playOnce } from './tone_manager.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.video = {};
    this.state = {
      keys: {
        chord1: { active: false },
        chord2: { active: false },
        chord3: { active: false },
        chord4: { active: false }
      },
      bodyPartLocation: {
        leftWrist: {
          x: 0,
          y: 0
        },
        rightWrist: {
          x: 0,
          y: 0
        }
      }
    };
  }

  // setActive = note => {
  //   const keys = { ...this.state.keys };
  //   keys[note].active = true;

  //   this.setState({ keys });
  // };

  receiveKeyBoardPress = key => {
    if (key === 'none') {
    } else {
      let keys = { ...this.state.keys };
      playOnce(key);
      keys[key].active = true;
      this.setState({ keys });
    }
  };

  componentDidMount = async () => {
    console.log('did mount');
    //Start Camera
    camera();
    //Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  receiveNewBodyPartLocation = bodyPartLocation => {
    this.setState(
      {
        bodyPartLocation
      },
      () => {
        keyboard(
          this.state.bodyPartLocation.leftWrist,
          this.receiveKeyBoardPress
        );
        keyboard(
          this.state.bodyPartLocation.rightWrist,
          this.receiveKeyBoardPress
        );
        loops(this.state.bodyPartLocation.leftWrist, this.receiveKeyBoardPress);
        loops(
          this.state.bodyPartLocation.rightWrist,
          this.receiveKeyBoardPress
        );
      }
    );
  };

  render() {
    return (
      <div className="container">
        <h1>Jam Cam</h1>
        <div className="bodypart-info">
          <p>Current Body Part Location</p>
          {this.state.bodyPartLocation ? (
            <div>
              <p>Left Wrist - X {this.state.bodyPartLocation.leftWrist.x}</p>
              <p>Left Wrist - Y {this.state.bodyPartLocation.leftWrist.y}</p>
              <p>Right Wrist - X {this.state.bodyPartLocation.rightWrist.x}</p>
              <p>Right Wrist - Y {this.state.bodyPartLocation.rightWrist.y}</p>
            </div>
          ) : (
            <p>This is no body data at the moment, go dance</p>
          )}
        </div>
        <div id="keyboard_container">
          <div id="keyboard">
            <div className="keyboard_1">1</div>
            <div className="keyboard_2">2</div>
            <div className="keyboard_3">3</div>
            <div className="keyboard_4">4</div>

            <div id="loops_container">
              <div className="loop_1">1</div>
              <div className="loop_2">2</div>
              <div className="loop_3">3</div>
              <div className="loop_4">4</div>
              <div className="loop_5">5</div>
              <div className="loop_6">6</div>
            </div>
            <video id="video" width="640" height="480" controls autoPlay />
            <canvas id="overlay" />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
