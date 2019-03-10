import React, { Component } from 'react';
import Loop from './loop'
import { uniqueID } from '../services/helpers';

class LoopBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loops: ['kick', 'bass', 'clap', 'hat', 'perc', 'vocal']
        };
    }


    render() {
        return (
            <div id="loops_container">
                {this.state.loops.map(e => (<Loop key={uniqueID()} name={e} />))}
            </div>
        );
    }
}

export default LoopBoard;