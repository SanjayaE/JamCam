import React, { Component } from 'react';
import Synth from './synth'
import { uniqueID } from '../services/helpers';
import { playNote } from '../services/tone_manager.js';
import synthTriggerAreas from '../services/synth_trigger_areas.js';

class SynthBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyNames: ['a2', 'b2', 'c3', 'd3', 'e3', 'f3', 'g3', 'a3'],
            keys: {
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
            previousNote: 'none'
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.leftWrist !== prevProps.leftWrist) {
            synthTriggerAreas(this.props.leftWrist, this.receiveSynthPress);
        }
    }

    //Callback provided to MODE 1 Keyboard. Controls chord active states & calls playOnce function
    receiveSynthPress = key => {
        let keys = { ...this.state.keys };
        for (var k in keys) {
            keys[k].active = false;
        }
        keys[key].active = true;

        if (
            key !== 'none' &&
            key !== 'movedOut' &&
            this.state.previousNote !== key
        ) {
            playNote(key);
            this.setState({ previousNote: key, keys });
        } else if (key === 'movedOut') {
            this.setState({ previousNote: 'none' });
        }
    };

    render() {
        return (
            <div id="keys_container">
                {this.state.keyNames.map(e => (
                    <Synth
                        key={uniqueID()}
                        name={e}
                        keyState={this.state.keys[e].active}
                    />
                ))}
            </div>
        );
    }
}

export default SynthBoard;
