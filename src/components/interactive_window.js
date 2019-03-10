import React, { Component } from 'react';
import KeyBoard from './key_board';
import LoopBoard from './loop_board';

class InteractiveWindow extends Component {

    render() {
        return (
            <div className="container">
                < KeyBoard cb={this.props.cb} />
                < LoopBoard cb={this.props.cb} />
            </div>
        );
    }
}

export default InteractiveWindow;