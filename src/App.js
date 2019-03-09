import React, { Component } from 'react';
import capture from './services/capture.js';
import camera from './services/camera.js';
import keyboard from './services/keyboard.js';
import keyboard2 from './services/keyboard2.js';
import KeyBoard2 from './views/_keyboard2.jsx';
import loopsSection from './services/loops.js';
import Tracks from './views/_tracks.jsx';
import tracks from './services/tracks.js';
import Mode1 from './views/_mode1.jsx';

import {
  playOnce,
  startLoop,
  stopAudio,
  playNote
} from './services/tone_manager.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: {
        chord1: { active: false },
        chord2: { active: false },
        chord3: { active: false },
        chord4: { active: false },
        none: { active: true },
        movedOut: { active: false }
      },
      keys2: {
        a2: { active: false },
        b2: { active: false },
        c3: { active: false },
        d3: { active: false },
        e3: { active: false },
        f3: { active: false },
        g3: { active: false },
        a3: { active: false },
        none: { active: true },
        movedOut: { active: false }
      },
      loops: {
        kick: { active: false },
        bass: { active: false },
        clap: { active: false },
        hat: { active: false },
        perc: { active: false },
        vocal: { active: false },
        none: { active: true }
      },
      tracks: {
        button1: { active: false },
        button2: { active: false },
        button3: { active: false },
        button4: { active: false },
        button5: { active: false },
        button6: { active: false },
        none: { active: true }
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
      mode: 1,
      previousChordKey: 'none',
      previousLoopKey: 'none'
    };
  }

  //Callback provided to MODE 1 Keyboard. Controls chord active states & calls playOnce function
  receiveKeyBoardPress = key => {
    let keys = { ...this.state.keys };
    keys.chord1.active = false;
    keys.chord2.active = false;
    keys.chord3.active = false;
    keys.chord4.active = false;
    keys[key].active = true;
    if (
      key !== 'none' &&
      key !== 'movedOut' &&
      this.state.previousChordKey !== key
    ) {
      playOnce(key);
      this.setState({ previousChordKey: key, keys });
    } else if (key === 'movedOut') {
      this.setState({ previousChordKey: 'none' });
    }
  };

  //MODE 2 KEYBOARD
  receiveKeyBoard2Press = key => {
    let keys2 = { ...this.state.keys2 };
    let active1, active2;

    //goes through keys2 and finds active notes (2 max)
    for (let note in keys2) {
      if (note !== 'none' && note !== 'movedOut' && keys2[note].active) {
        if (keys2[note].active === 1) {
          active1 = note;
        } else if (keys2[note].active === 2) {
          active2 = note;
        }
      }
    }

    if (key !== 'none' && key !== 'movedOut') {
      playNote(key);
      //if both notes are active, drop old note and set new key to active
      if (active2 && active1) {
        keys2[key].active = 2;
        keys2[active1].active = false;
        keys2[active2].active = 1;
        //if only one note is active, make old active note to 2 and new to 1
      } else if (active2) {
        keys2[active2].active = 1;
        keys2[key].active = 2;
        //if no notes are active, set new key to 2
      } else {
        keys2[key].active = 2;
      }
      //set all to false if there are active keys
    } else if (key === 'movedOut') {
      if (active1) {
        keys2[active1].active = false;
      }
      if (active2) {
        keys2[active2].active = false;
      }
    }
  };

  //Callback provided to LoopsSection. Passes state to loopCheck & calls startLoop function
  receiveLoopPress = loop => {
    if (
      loop !== 'none' &&
      loop !== 'movedOut' &&
      this.state.previousLoopKey !== loop
    ) {
      let loops = { ...this.state.loops };
      startLoop(loop, this.loopCheck);
      this.setState({ previousLoopKey: loop, loops });
    } else if (loop === 'movedOut') {
      this.setState({ previousLoopKey: 'none' });
    }
  };

  receiveTracksPress = track => {};

  //Checks if loop active, then updates the state of loops
  loopCheck = (loop, state) => {
    let loops = { ...this.state.loops };
    loops[loop].active = state;
    this.setState({ loops });
  };

  //Determines CSS for active or inactive states
  defineClass = (type, input) => {
    if (this.state[type][input].active) {
      return input + ' active';
    } else {
      return input + ' inactive';
    }
  };

  //Toggle between regular and mega-jam modes
  toggleMode = () => {
    stopAudio();
    if (this.state.mode === 1) {
      this.setState({ mode: 2 });
    } else {
      this.setState({ mode: 1 });
    }
    let loops = { ...this.state.loops };
    for (let loop in loops) {
      loops[loop].active = false;
    }
    this.setState({ loops });
  };

  componentDidMount = async () => {
    console.log('did mount');
    //Start Camera
    camera();
    //Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  componentWillUnmount = () => {
    //find a way to stop capturing and tone.js
    console.log('unmount');
    //this will reload the homepage and stop process , not a great way to stop, temp fix.
    // window.location.reload();
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
        } else {
          keyboard2(
            this.state.bodyPartLocation.leftWrist,
            this.receiveKeyBoard2Press
          );
          keyboard2(
            this.state.bodyPartLocation.rightWrist,
            this.receiveKeyBoard2Press
          );
        }
      }
    );
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
                <KeyBoard2 cb={this.defineClass} />
                <Tracks cb={this.defineClass} />
              </div>
            )}

            <video id="video" width="640" height="480" controls autoPlay />
            <canvas id="overlay" />
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

          {/* <div className="bodypart-info">
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
          </div> */}
        </div>
      </div>
    );
  }
}
export default App;
