import React, { Component } from 'react';
import capture from './services/capture.js';
import camera from './services/camera.js';
import keyboard from './services/keyboard.js';
import loopsSection from './services/loops.js';
import { playOnce, startLoop } from './tone_manager.js';

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
      loops: {
        kick: { active: false },
        bass: { active: false },
        clap: { active: false },
        hat: { active: false },
        perc: { active: false },
        vocal: { active: false },
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
      view: 'default',
      previousChordKey: 'none',
      previousLoopKey: 'none'
    };
  }

  //REWORK THIS
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

  loopCheck = (loop, state) => {
    let loops = { ...this.state.loops };
    loops[loop].active = state;
    this.setState({ loops });
    console.log(this.state.loops);
  };

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

  defineClass = (type, input) => {
    if (this.state[type][input].active) {
      return input + ' active';
    } else {
      return input + ' inactive';
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
  //onclick "this.setState.view = "mode2""
  render() {
    return (
      <div className="container">
        {this.state.view === 'default2' && <div id="test">hello world</div>}

        {this.state.view === 'default' && <h1>werwersdfds</h1>}
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
            <div className={this.defineClass('keys', 'chord1')}>1</div>
            <div className={this.defineClass('keys', 'chord2')}>2</div>
            <div className={this.defineClass('keys', 'chord3')}>3</div>
            <div className={this.defineClass('keys', 'chord4')}>4</div>

            <div id="loops_container">
              <div className={this.defineClass('loops', 'kick')}>Kick</div>
              <div className={this.defineClass('loops', 'bass')}>Bass</div>
              <div className={this.defineClass('loops', 'clap')}>Clap</div>
              <div className={this.defineClass('loops', 'hat')}>Hat</div>
              <div className={this.defineClass('loops', 'perc')}>Perc</div>
              <div className={this.defineClass('loops', 'vocal')}>Vocal</div>
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
