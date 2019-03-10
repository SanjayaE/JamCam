import React, { Component } from 'react';
import InteractiveWindow from './interactive_window';
import Panel from './panel';
import keyboardTriggerAreas from '../services/keyboard_trigger_areas.js';
// import loopsSection from '../services/loops.js';
import { playOnce, startLoop, stopAudio, playNote } from '../services/tone_manager.js';
import capture from '../services/capture';
import { CameraStart, CameraStop } from '../services/camera';

class JamCam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // keys: {
            //     chord1: { active: false },
            //     chord2: { active: false },
            //     chord3: { active: false },
            //     chord4: { active: false },
            //     none: { active: true },
            //     movedOut: { active: false }
            // },
            // loops: {
            //     kick: { active: false },
            //     bass: { active: false },
            //     clap: { active: false },
            //     hat: { active: false },
            //     perc: { active: false },
            //     vocal: { active: false },
            //     beat1: { active: false },
            //     beat2: { active: false },
            //     beat3: { active: false },
            //     bassline1: { active: false },
            //     bassline2: { active: false },
            //     bassline3: { active: false },
            //     none: { active: true }
            // },
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
        };
    }

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
    //Callback provided to MODE 1 Keyboard. Controls chord active states & calls playOnce function
    // receiveKeyBoardPress = key => {
    //     let keys = { ...this.state.keys };
    //     keys.chord1.active = false;
    //     keys.chord2.active = false;
    //     keys.chord3.active = false;
    //     keys.chord4.active = false;
    //     keys[key].active = true;
    //     if (
    //         key !== 'none' &&
    //         key !== 'movedOut' &&
    //         this.state.previousChordKey !== key
    //     ) {
    //         playOnce(key);
    //         this.setState({ previousChordKey: key, keys });
    //     } else if (key === 'movedOut') {
    //         this.setState({ previousChordKey: 'none' });
    //     }
    // };

    //MODE1
    //Callback provided to LoopsSection. Passes state to loopCheck & calls startLoop function
    // receiveLoopPress = loop => {
    //     if (
    //         loop !== 'none' &&
    //         loop !== 'movedOut' &&
    //         this.state.previousLoopKey !== loop
    //     ) {
    //         let loops = { ...this.state.loops };
    //         startLoop(loop, this.loopCheck);
    //         this.setState({ previousLoopKey: loop, loops });
    //     } else if (loop === 'movedOut') {
    //         this.setState({ previousLoopKey: 'none' });
    //     }
    // };

    //Checks if loop active, then updates the state of loops
    // loopCheck = (loop, state) => {
    //     let loops = { ...this.state.loops };
    //     loops[loop].active = state;
    //     this.setState({ loops });
    // };

    //Determines CSS for active or inactive states
    // defineClass = (type, input) => {
    //     if (this.state[type][input].active) {
    //         return input + ' active';
    //     } else {
    //         return input + ' inactive';
    //     }
    // };

    //Takes in body part locations and maps to keyboard and loops
    receiveNewBodyPartLocation = (bodyPartLocation) => {
        this.setState(
            {
                bodyPartLocation
            },
            () => {

                // keyboardTriggerAreas(
                //     this.state.bodyPartLocation.leftWrist,
                //     this.receiveKeyBoardPress
                // );
                // loopsSection(
                //     this.state.bodyPartLocation.rightWrist,
                //     this.receiveLoopPress
                // );
            }
        );
    };

    render() {
        return (
            <div className="container">
                < InteractiveWindow leftWrist={this.state.bodyPartLocation.leftWrist} rightWrist={this.state.bodyPartLocation.rightWrist} />
                <video id="video" width="640" height="480" controls autoPlay />
                <canvas id="overlay" />
                < Panel />
            </div>
        );
    }
}

export default JamCam;