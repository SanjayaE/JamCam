import React, { Component } from 'react';
import Loop from './loop'
import { uniqueID } from '../services/helpers';
import { startLoop } from '../services/tone_manager.js';
import loopTriggerAreas from '../services/loop_trigger_areas.js';

class LoopBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loopNames: ['kick', 'bass', 'clap', 'hat', 'perc', 'vocal'],
            loops: {
                kick: { active: false },
                bass: { active: false },
                clap: { active: false },
                hat: { active: false },
                perc: { active: false },
                vocal: { active: false },
            },
            previousLoopKey: 'none'
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.rightWrist !== prevProps.rightWrist) {
            loopTriggerAreas(this.props.rightWrist, this.receiveLoopPress)
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

    //Checks if loop active, then updates the state of loops
    loopCheck = (loop, state) => {
        let loops = { ...this.state.loops };
        loops[loop].active = state;
        this.setState({ loops });
    };


    render() {
        return (
            <div id="loops_container">
                {this.state.loopNames.map(e => (<Loop key={uniqueID()} name={e} loopState={this.state.loops[e].active} />))}
            </div>
        );
    }
}

export default LoopBoard;