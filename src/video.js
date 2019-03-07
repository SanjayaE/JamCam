import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
import capture from "./services/capture.js";
import camera from "./services/camera.js";
import keyboard from "./services/keyboard.js";
const Tone = require("tone");
var synth = new Tone.AMSynth().toMaster();

class Video extends Component {
  constructor(props) {
    super(props);
    this.video = {};
    this.state = {
      keys: {
        C: { synth: "c3", active: false },
        D: { synth: "d3", active: false },
        E: { synth: "e3", active: false },
        F: { synth: "f3", active: false },
        G: { synth: "g3", active: false },
        A: { synth: "a3", active: false },
        B: { synth: "b3", active: false }
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
      },
      mode: "landing"
    };
  }

  // setActive = note => {
  //   const keys = { ...this.state.keys };
  //   keys[note].active = true;

  //   this.setState({ keys });
  // };

  recieveKeyBoardPress = key => {
    console.log("passing them keys");
    if (key === "none") {
    } else {
      let keys = this.state.keys;
      for (var notes in keys) {
        if ((notes = key)) {
          keys.notes = true;
        }
      }
      this.setState({ keys });
    }
  };

  componentDidMount = async () => {
    console.log("did mount");
    // NOTE: Start Camera
    camera(); // camera module
    //NOTE: Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };
  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   console.log('testhing this here ----->', this.state);
  //   if (this.state !== prevState) {
  //     keyboard(
  //       this.state.bodyPartLocation.leftWrist,
  //       this.recieveKeyBoardPress
  //     );
  //     keyboard(
  //       this.state.bodyPartLocation.rightWrist,
  //       this.recieveKeyBoardPress
  //     );
  //     console.log('its not the same!');
  //   }
  // }

  receiveNewBodyPartLocation = bodyPartLocation => {
    console.log("Updating Body Part Location");

    this.setState(
      {
        bodyPartLocation
      },
      () => {
        keyboard(
          this.state.bodyPartLocation.leftWrist,
          this.recieveKeyBoardPress
        );
        keyboard(
          this.state.bodyPartLocation.rightWrist,
          this.recieveKeyBoardPress
        );
      }
    );
  };

  render() {
    return (
      <div className="container">
        {/* <h1>Jam Cam</h1> */}
        {/* <div>
          <Nav />
        </div> */}
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
export default Video;
