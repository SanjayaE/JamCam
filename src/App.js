import React, { Component } from 'react';
import capture from './services/capture.js';
import camera from './services/camera.js';
import keyboard from './services/keyboard.js';
import { playOnce } from './tone_manager.js'

class App extends Component {
  constructor(props) {
    super(props);
    // this.video = {};
    this.state = {
      keys: {
        chord1: { active: false },
        chord2: { active: false },
        chord3: { active: false },
        chord4: { active: false },
      },
      loops: {
        loop1: { active: false },
        loop2: { active: false },
        loop3: { active: false },
        loop4: { active: false },
        loop5: { active: false },
        loop6: { active: false },
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
      playOnce(key)
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
            <div className="keyboard_D">D</div>
            <div className="keyboard_E">E</div>
            <div className="keyboard_F">F</div>
            <div className="keyboard_G">G</div>
            <div className="keyboard_A">A</div>
            <div className="keyboard_B">B</div>
            <video id="video" width="640" height="480" controls autoPlay />
            <canvas id="overlay" />
          </div>
        </div>
      </div>
    );
  }
}
export default App;
