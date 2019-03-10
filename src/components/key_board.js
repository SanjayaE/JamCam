import React, { Component } from 'react';
import Key from './key'

class KeyBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: ['chord1', 'chord2', 'chord3', 'chord4']
        };
    }

    render() {
        return (
            <div id="keys_container">
                {this.state.keys.map(e => (<Key name={e} cb={this.props.cb} />))}
            </div>
        );
    }
}

export default KeyBoard;