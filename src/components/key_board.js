import React, { Component } from 'react';
import Key from './key'
import { uniqueID } from '../services/helpers';
import { playOnce } from '../services/tone_manager.js';
import keyboardTriggerAreas from '../services/keyboard_trigger_areas.js';

class KeyBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keyNames: ['chord1', 'chord2', 'chord3', 'chord4'],
            keys: {
                chord1: { active: false },
                chord2: { active: false },
                chord3: { active: false },
                chord4: { active: false },
                none: { active: true },
                movedOut: { active: false }
            },
            previousChordKey: 'none'
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.leftWrist !== prevProps.leftWrist) {
            keyboardTriggerAreas(this.props.leftWrist, this.receiveKeyBoardPress)
        }
    };

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

    render() {
        return (
            <div id="keys_container">
                {this.state.keyNames.map(e => (<Key key={uniqueID()} name={e} keyState={this.state.keys[e].active} />))}
            </div>
        );
    }
}

export default KeyBoard;