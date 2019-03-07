import React, { Component } from "react";
import capture from "./services/capture.js";
import camera from "./services/camera.js";
import keyboard from "./services/keyboard.js";
import loopsSection from "./services/loops.js";
import { playOnce, startLoop } from "./tone_manager.js";

class App extends Component {
  constructor(props) {
    super(props);
    // this.video = {};
    this.state = {
      keys: {
        chord1: { active: false },
        chord2: { active: false },
        chord3: { active: false },
        chord4: { active: false }
      },
      loops: {
        kick: { active: false },
        bass: { active: false },
        clap: { active: false },
        hat: { active: false },
        perc: { active: false },
        vocal: { active: false }
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

  //REWORK THIS
  receiveKeyBoardPress = key => {
    if (key === "none") {
    } else {
      let keys = { ...this.state.keys };
      playOnce(key);
      keys[key].active = true;
      this.setState({ keys });
    }
  };

  receiveLoopPress = loop => {
    if (loop === "none") {
    } else {
      let loops = { ...this.state.loops };
      startLoop(loop);
      loops[loop].active = true;
      this.setState({ loops });
    }
  };

  componentDidMount = async () => {
    console.log("did mount");
    //Start Camera
    camera();
    //Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  componentWillUnmount = () => {
    //find a way to stop capturing and tone.js
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
        loopsSection(
          this.state.bodyPartLocation.leftWrist,
          this.receiveLoopPress
        );
        loopsSection(
          this.state.bodyPartLocation.rightWrist,
          this.receiveLoopPress
        );
      }
    );
  };

  render() {
    return (
      <div className="container">
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
            <div className="chord1">1</div>
            <div className="chord2">2</div>
            <div className="chord3">3</div>
            <div className="chord4">4</div>

            <div id="loops_container">
              <div className="kick">1</div>
              <div className="bass">2</div>
              <div className="clap">3</div>
              <div className="hat">4</div>
              <div className="perc">5</div>
              <div className="vocal">6</div>
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
