import React, { Component } from 'react';
import KeyBoard from './key_board';
import LoopBoard from './loop_board';

class InteractiveWindow extends Component {

    render() {
        return (
            <div className="container">
                < KeyBoard defineClass={this.props.defineClass} />
                < LoopBoard defineClass={this.props.defineClass} />
            </div>
        );
    }
}

export default InteractiveWindow;