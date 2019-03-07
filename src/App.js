import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Nav from "./Nav";
// import capture from "./services/capture.js";
// import camera from "./services/camera.js";
// import keyboard from "./services/keyboard.js";
// const Tone = require("tone");
// var synth = new Tone.AMSynth().toMaster();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: "landing"
    };
  }

  // setActive = note => {
  //   const keys = { ...this.state.keys };
  //   keys[note].active = true;

  //   this.setState({ keys });
  // };

  // recieveKeyBoardPress = key => {
  //   console.log("passing them keys");
  //   if (key === "none") {
  //   } else {
  //     let keys = this.state.keys;
  //     for (var notes in keys) {
  //       if ((notes = key)) {
  //         keys.notes = true;
  //       }
  //     }
  //     this.setState({ keys });
  //   }
  // };

  componentDidMount = async () => {
    console.log("did mount");
    // NOTE: Start Camera
    // camera(); // camera module
    // //NOTE: Start Capture and Provide Callback
    // capture(this.receiveNewBodyPartLocation);
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

  // receiveNewBodyPartLocation = bodyPartLocation => {
  //   console.log("Updating Body Part Location");

  //   this.setState(
  //     {
  //       bodyPartLocation
  //     },
  //     () => {
  //       keyboard(
  //         this.state.bodyPartLocation.leftWrist,
  //         this.recieveKeyBoardPress
  //       );
  //       keyboard(
  //         this.state.bodyPartLocation.rightWrist,
  //         this.recieveKeyBoardPress
  //       );
  //     }
  //   );
  // };

  render() {
    return (
      <div className="container">
        <h1>Jam Cam</h1>
        <div>
          <Nav />
        </div>
      </div>
    );
  }
}
export default App;
