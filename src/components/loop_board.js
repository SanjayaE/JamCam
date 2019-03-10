import React, { Component } from 'react';
import Loop from './loop'

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
                {this.state.loops.map(e => (<Loop name={e} cb={this.props.cb} />))}
            </div>
        );
    }
}

export default LoopBoard;