import React, { Component } from 'react';
import Track from './track';
import { uniqueID } from '../services/helpers';
import { startLoop, switchOtherSoundOff } from '../services/tone_manager.js';
import trackTriggerAreas from '../services/track_trigger_areas.js';

class TrackBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loops: {
                beat1: { active: false },
                beat2: { active: false },
                beat3: { active: false },
                bassline1: { active: false },
                bassline2: { active: false },
                bassline3: { active: false },
                none: { active: true }
            },
            previousTrack: 'none'
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.rightWrist !== prevProps.rightWrist) {
            trackTriggerAreas(this.props.rightWrist, this.receiveLoopPress);
        }
    }

    //Only let 1/3 beats or basslines be active at once for mode 2
    switchOtherLightsOff(loop) {
        let loops = { ...this.state.loops }
        if (loop === 'beat1') {
            loops['beat2'].active = false
            loops['beat3'].active = false
        } else if (loop === 'beat2') {
            loops['beat1'].active = false
            loops['beat3'].active = false
        } else if (loop === 'beat3') {
            loops['beat1'].active = false
            loops['beat2'].active = false
        } else if (loop === 'bassline1') {
            loops['bassline2'].active = false
            loops['bassline3'].active = false
        } else if (loop === 'bassline2') {
            loops['bassline1'].active = false
            loops['bassline3'].active = false
        } else if (loop === 'bassline3') {
            loops['bassline1'].active = false
            loops['bassline2'].active = false
        }
        this.setState({ loops });
    }


    //Callback provided to LoopsSection. Passes state to loopCheck & calls startLoop function
    receiveLoopPress = loop => {
        if (
            loop !== 'none' &&
            loop !== 'movedOut' &&
            this.state.previousTrack !== loop
        ) {
            let loops = { ...this.state.loops };
            switchOtherSoundOff(loop)
            this.switchOtherLightsOff(loop)
            startLoop(loop, this.loopCheck);
            this.setState({ previousTrack: loop, loops });
        } else if (loop === 'movedOut') {
            this.setState({ previousTrack: 'none' });
        }
    };

    //Checks if loop active, then updates the state of loops
    loopCheck = (loop, state) => {
        let loops = { ...this.state.loops };
        loops[loop].active = state;
        this.setState({ loops });
    };


    render() {
        return (
            <div id="loops_container">
                {Object.keys(this.state.loops).map(e => (<Track key={uniqueID()} name={e} loopState={this.state.loops[e].active} />))}
            </div>
        );
    }
}

export default TrackBoard;
