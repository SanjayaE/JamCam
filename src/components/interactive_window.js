import React, { Component } from 'react';
import KeyBoard from './key_board';
import LoopBoard from './loop_board';

class InteractiveWindow extends Component {

    render() {
        return (
            <div className="container">
                < KeyBoard leftWrist={this.props.leftWrist} />
                < LoopBoard rightWrist={this.props.rightWrist} />
            </div>
        );
    }
}

export default InteractiveWindow;