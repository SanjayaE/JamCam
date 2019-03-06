import React, { Component } from 'react';
import capture from './services/capture.js';
import camera from './services/camera.js';
import keyboard from './services/keyboard.js';

// import * as posenet from '@tensorflow-models/posenet';
// const context = new AudioContext();
//const Tone = require("tone");
// var synth = new Tone.AMSynth().toMaster();

class App extends Component {
  constructor(props) {
    super(props);
    this.video = {};
    this.state = {
      noteC: 'inactive',
      noteD: 'inactive',
      noteE: 'inactive',
      noteF: 'inactive',
      noteA: 'inactive',
      noteB: 'inactive',
      bodyPartLocation: null
    };
    // this.state = {
    //   keys: {
    //   //   C: {synth: 'c3', active: false },
    //   //   D: {synth: 'd3', active: false },
    //   //   { note: 'C', synth: 'c3', class: 'keyboard_C', active: false },
    //   //   { note: 'C', synth: 'c3', class: 'keyboard_C', active: false },
    //   //   { note: 'C', synth: 'c3', class: 'keyboard_C', active: false },
    //   //   { note: 'C', synth: 'c3', class: 'keyboard_C', active: false },
    //   //   { note: 'C', synth: 'c3', class: 'keyboard_C', active: false },
    //   // ]
    // };
    // this.keyBoardPress = this.keyBoardPress.bind(this);
  }

  setActive = note => {
    const keys = { ...this.state.keys };
    keys[note].active = true;
    this.setState({ keys });
  };

  keyBoardPress(note) {
    console.log('okey doey');
  }

  componentDidMount = async () => {
    console.log('did mount');
    // NOTE: Start Camera
    camera(); // camera module
    //NOTE: Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  receiveNewBodyPartLocation = bodyPartLocation => {
    console.log('Updateing Body Part Location');

    // const note = determineNote(
    //   bodyPartLocation.leftWrist,
    //   bodyPartLocation.rightWrist
    // );
    this.setState({
      bodyPartLocation
      // note
    });
    // keyboard(note);
    // keyboard(bodyPartLocation.leftWrist, bodyPartLocation.rightWrist);
  };
  //           <Key className="keyboard_C" active={this.state.keys.C.active}>
  // C
  //           </Key>
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
