import React, { Component } from 'react';
import capture from './services/capture.js';
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
import { CameraStart, CameraStop } from './services/camera.js';

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
        beat1: { active: false },
        beat2: { active: false },
        beat3: { active: false },
        bassline1: { active: false },
        bassline2: { active: false },
        bassline3: { active: false },
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
      previousLoopKey: 'none',
      previousNote: 'none',
      previousTrackButton: 'none'
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
    keys2.a2.active = false;
    keys2.b2.active = false;
    keys2.c3.active = false;
    keys2.d3.active = false;
    keys2.e3.active = false;
    keys2.f3.active = false;
    keys2.g3.active = false;
    keys2.a3.active = false;
    keys2[key].active = true;
    if (
      key !== 'none' &&
      key !== 'movedOut' &&
      this.state.previousNote !== key
    ) {
      playNote(key);
      this.setState({ previousNote: key, keys2 });
    } else if (key === 'movedOut') {
      this.setState({ previousNote: 'none' });
    }
  };

  //MODE1
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

  receiveTrackPress = button => {
    let tracks = { ...this.state.tracks };
    console.log('button is: ', button);
    if (
      button !== 'none' &&
      button !== 'movedOut' &&
      this.state.previousTrackButton !== button
    ) {
      if (button === 'beat1' || button === 'beat2' || button === 'beat3') {
        if (
          tracks[button].active === true &&
          this.state.previousTrackButton != button
        ) {
          tracks[button].active = false;
        } else if (
          !tracks[button].active &&
          this.state.previousTrackButton != button
        ) {
          tracks.beat1.active = false;
          tracks.beat2.active = false;
          tracks.beat3.active = false;
          tracks[button].active = true;
        }
      } else if (
        button === 'bassline1' ||
        button === 'baseline2' ||
        button === 'baseline3'
      ) {
        if (tracks[button].active) {
          tracks[button].active = false;
        } else if (!tracks[button].active) {
          tracks.bassline1.active = false;
          tracks.bassline2.active = false;
          tracks.bassline3.active = false;
          tracks[button].active = true;
        }
      }
    } else if (button === 'movedOut') {
      tracks.previousTrackButton = 'none';
    }
    this.setState();
  };

  //MODE 2:

  //Checks if loop active, then updates the state of loops
  loopCheck = (type, loop, state) => {
    let loops = { ...this.state.loops };
    let tracks = { ...this.state.tracks };
    [type][loop].active = state;
    this.setState({ loops, tracks });
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
    CameraStart();
    //Start Capture and Provide Callback
    capture(this.receiveNewBodyPartLocation);
  };

  componentWillUnmount = () => {
    console.log('unmount');
    //turn off camera and audio when you switch from the video page
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
          tracks(
            this.state.bodyPartLocation.rightWrist,
            this.receiveTrackPress
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
                <Mode2 cb={this.defineClass} />
              </div>
            )}

            <video id="video" width="640" height="480" controls autoPlay />
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
